import { useEffect, useState } from "react";
import { Usuario } from "../../model/Usuario";
import { Boton } from "../Boton/Boton";
import { FormInput } from "../Formularios/FormInput/FormInput";
import { FormSelect } from "../Formularios/FormSelect/FormSelect";
import { UbicacionService } from "../../utilities/RegionComuna";
import { useUsuarioService } from "../../context/UsuarioServiceContext/UseUsuarioService";
import { useSesion } from "../../context/SesionContext/UseSesion";

 interface EditUserProps
 {
    usuario: Usuario;
    onCloseEdit?: () => void;
 }

export function EditUser({usuario, onCloseEdit}: EditUserProps)
{
    const { sesion } = useSesion();
    const { usuarioService } = useUsuarioService();

    const [formData, setFormData] = useState({
        nombreUsuario: usuario.getNombreUsuario()  || "No proporcionado",
        email: usuario.getEmail()  || "No proporcionado",
        confirmarEmail: "",
        contraseña: usuario.getContraseña()  || "No proporcionado",
        confirmarContraseña: "",
        telefono: usuario.getTelefono()  || "",
        region: usuario.getRegion() || "",
        comuna: usuario.getComuna() || "",
        tipo: usuario.getTipo() || "Sin tipo¿?"
    });

    const [regiones, setRegiones] = useState<string[]>([]);
    const [comunas, setComunas] = useState<string[]>([]);

    useEffect(() => 
    {
        setRegiones(UbicacionService.getRegiones());
    }, []);

    useEffect(() => 
    {
        if (formData.region) 
            setComunas(UbicacionService.getComunas(formData.region));
        else
            setComunas([]);
    }, [formData.region]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => 
    {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => 
    {
        const { name, value } = e.target;

        setFormData((prev) => 
        {
            // Reiniciamos el valor de comuna
            if (name === "region")
                return { ...prev, region: value, comuna: "" };

            return { ...prev, [name]: value };
        });
    };

    async function validarFormRegistro(formData: any): Promise<string[]> {
        const errores: string[] = [];
    
        // Validar nombre de usuario
        if (!formData.nombreUsuario?.trim()) {
            errores.push("El nombre de usuario es obligatorio.");
        }
    
        // Validar email
        if (!formData.email || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
            errores.push("El correo electrónico no es válido.");
        }
    
        // Validar correo de confirmación
        if (!formData.confirmarEmail && (formData.email !== usuario.getEmail())) 
        {
            if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.confirmarEmail)) {
                errores.push("El correo electrónico de confirmación no es válido.");
            } else if (formData.email !== formData.confirmarEmail) {
                errores.push("Los correos no coinciden.");
            }
        }
    
        // Verificar si el correo ya existe (solo si cambió)
        if (formData.email && formData.email !== usuario.getEmail()) {
            const existe = await usuarioService.fetchByEmail(formData.email);
            if (existe) {
                errores.push("Ese correo ya existe.");
            }
        }
    
        // Validar contraseña
        if (!formData.contraseña || formData.contraseña.length < 6) {
            errores.push("La contraseña debe tener al menos 6 caracteres.");
        }
    
        // Validar confirmación de contraseña solo si la contraseña cambió
        if (formData.contraseña !== usuario.getContraseña()) {
            if (formData.contraseña !== formData.confirmarContraseña) {
                errores.push("Las contraseñas no coinciden.");
            }
        }
    
        // Validar tipo de usuario
        if (!formData.tipo) {
            errores.push("Debes colocarle un tipo al usuario!");
        } else {
            if (
                sesion.getIdUsuarioActivo() === usuario.getId() &&
                formData.tipo !== usuario.getTipo()
            ) {
                errores.push("No puedes cambiarte el tipo a ti mismo regalón!");
            }
        }
    
        // Validar teléfono (opcional)
        if (formData.telefono && !/^\d{9}$/.test(formData.telefono)) {
            errores.push("El teléfono debe tener 9 dígitos.");
        }
    
        return errores;
    }
    

    const handleSubmit = async (e: React.FormEvent) => 
    {
        e.preventDefault();

        const errores = await validarFormRegistro(formData);

        if (errores.length > 0) 
        {
            alert("Errores:\n" + errores.join("\n"));
            return;
        }

        
        const usuarioNuevo = new Usuario()
            .setId(usuario.getId())
            .setNombreUsuario(formData.nombreUsuario)
            .setEmail(formData.email)
            .setContraseña(formData.contraseña)
            .setTelefono(formData.telefono)
            .setRegion(formData.region)
            .setComuna(formData.comuna)
            .setProfilePhoto(usuario.getProfilePhoto())
            .setTipo(formData.tipo || "usuario");

        const resultado = await usuarioService.update(usuario.getId(), usuarioNuevo);

        if (resultado.success)
        {
            setFormData({
                nombreUsuario: usuarioNuevo.getNombreUsuario()  || "No proporcionado",
                email: usuarioNuevo.getEmail()  || "No proporcionado",
                confirmarEmail: "",
                contraseña: usuarioNuevo.getContraseña()  || "No proporcionado",
                confirmarContraseña: "",
                telefono: usuarioNuevo.getTelefono()  || "",
                region: usuarioNuevo.getRegion() || "",
                comuna: usuarioNuevo.getComuna() || "",
                tipo: usuarioNuevo.getTipo() || ""
            });

            onCloseEdit?.();
        }

        alert(resultado.message);
        return resultado.success;
    };

    return(
        <>
            <form onSubmit={handleSubmit}>
                <div className="panel-usuario-editar">
                    <FormInput 
                        name='nombreUsuario'
                        label='Nombre de Usuario'
                        onChange={handleChange}
                        value={formData.nombreUsuario} />
                    <FormInput 
                        name='email'
                        label='Correo'
                        onChange={handleChange}
                        value={formData.email} />
                    <FormInput 
                        name='confirmarEmail'
                        label='Confirmar Correo'
                        onChange={handleChange}
                        value={formData.confirmarEmail} />
                    <FormInput 
                        name='contraseña'
                        label='Contraseña'
                        onChange={handleChange}
                        value={formData.contraseña} />
                    <FormInput 
                        name='confirmarContraseña'
                        label='Confirmar Contraseña'
                        onChange={handleChange}
                        value={formData.confirmarContraseña} />
                    <FormInput
                        name='telefono'
                        label='Telefono (Opcional)'
                        placeholder='9XXXXXXXX'
                        onChange={handleChange}
                        value={formData.telefono} />
                    <FormInput
                        name='tipo'
                        label='Tipo'
                        placeholder='Tipo'
                        onChange={handleChange}
                        value={formData.tipo} />
                    <FormSelect
                        name="region"
                        label='Región'
                        value={formData.region}
                        options={regiones.map(r => ({ value: r, label: r }))}
                        onChange={handleSelectChange} />
                    <FormSelect
                        name="comuna"
                        label='Comuna'
                        value={formData.comuna}
                        options={comunas.map(c => ({ value: c, label: c }))}
                        onChange={handleSelectChange} />
                    <div>
                        <Boton
                            className='formulario'
                            type="submit">
                                Guardar
                        </Boton> 
                    </div>
                </div>
            </form>
        </>
    );
}