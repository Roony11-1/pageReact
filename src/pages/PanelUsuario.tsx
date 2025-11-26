import { useEffect, useState } from "react";
import { ProfilePhoto } from "../components/ProfilePhoto/ProfilePhoto";
import { LoginSecurity } from "../components/Seguridad/LoginSecurity/LoginSecurity";
import { useSesion } from "../context/SesionContext/UseSesion";
import { Usuario } from "../model/Usuario";
import { UsuarioApiService } from "../services/UsuarioApiService";
import { Boton } from "../components/Boton/Boton";
import { FormInput } from "../components/Formularios/FormInput/FormInput";
import { FormSelect } from "../components/Formularios/FormSelect/FormSelect";
import { UbicacionService } from "../utilities/RegionComuna";

import "../assets/css/PanelUsuario/panelusuario.css"
import { useUsuarioService } from "../context/UsuarioServiceContext/UseUsuarioService";

export function PanelUsuario()
{
    const { sesion } = useSesion();
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [editando, setEditando] = useState(false);
    const [loading, setLoading] = useState(true);

    const { usuarioService } = useUsuarioService();

    useEffect(() => 
    {
        const fetchUsuario = async () => 
        {
            const idUsuarioActivo = sesion.getIdUsuarioActivo();

            if (idUsuarioActivo)
            {
                const datos = await usuarioService.fetchById(idUsuarioActivo);
                setUsuario(datos);
            }
            else
                setUsuario(null);

            setLoading(false)
        };

        fetchUsuario();
    }, []);

    const clickModificar = (e: React.MouseEvent<HTMLButtonElement>) => 
    {
        e.preventDefault();
        setEditando(!editando);
    };

    if (loading) return <p>Cargando...</p>;

    return (
        <LoginSecurity>
            {usuario && (
                <>
                    <div>
                        <ProfilePhoto profilePhoto={usuario.getProfilePhoto()} />
                    </div>
                    {
                        !editando ?
                            (<DisplayInfo 
                                nombre={usuario.getNombreUsuario()}
                                email={usuario.getEmail()}
                                telefono={usuario.getTelefono()}
                                region={usuario.getRegion()}
                                comuna={usuario.getComuna()}
                                onClick={clickModificar} />) :
                            (<EditInfo
                                id={usuario.getId()}
                                nombre={usuario.getNombreUsuario()}
                                email={usuario.getEmail()}
                                contraseña={usuario.getContraseña()}
                                telefono={usuario.getTelefono()}
                                region={usuario.getRegion()}
                                comuna={usuario.getComuna()}
                                profilePhoto={usuario.getProfilePhoto()}
                                tipo={usuario.getTipo() || "usuario"}
                                setUsuario={setUsuario}
                                onClick={clickModificar} />)
                                
                    }
                </>
            )}
        </LoginSecurity>
    );
}

interface displayInfoProps
{
    nombre: (string | null);
    email: (string | null);
    telefono: (string | null);
    region: (string | null);
    comuna: (string | null);
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function DisplayInfo({nombre, email, telefono, region, comuna, onClick}: displayInfoProps)
{
    return(
        <>
            <div className="panel-usuario-editar">
                <p><strong>Nombre de Usuario:</strong> {nombre || "No proporcionado"}</p>
                <p><strong>Email:</strong> {email || "No proporcionado"}</p>
                <p><strong>Teléfono:</strong> {telefono || "No proporcionado"}</p>
                <p><strong>Región:</strong> {region || "No proporcionado"}</p>
                <p><strong>Comuna:</strong> {comuna || "No proporcionado"}</p>

                <Boton
                    className="boton-panel"
                    onClick={onClick}>
                    Modificar
                </Boton>
            </div>
        </>
    );
}

interface EditInfo
{
    id: number;
    nombre: (string | null);
    email: (string | null);
    contraseña: (string | null);
    telefono: (string | null);
    region: (string | null);
    comuna: (string | null);
    profilePhoto: string;
    tipo: string;
    setUsuario: (usuario: Usuario) => void;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function EditInfo({id, nombre, email, contraseña, telefono, region, comuna, profilePhoto, tipo, onClick, setUsuario}: EditInfo)
{
    const [formData, setFormData] = useState({
        nombreUsuario: nombre  || "No proporcionado",
        email: email  || "No proporcionado",
        confirmarEmail: "",
        contraseña: contraseña  || "",
        confirmarContraseña: "",
        telefono: telefono  || "",
        region: region || "",
        comuna: comuna || ""
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

    function validarFormRegistro(formData: any): string[] 
    {
        const errores: string[] = [];

        if (!formData.nombreUsuario.trim())
            errores.push("El nombre de usuario es obligatorio.");

        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email))
            errores.push("El correo electrónico no es válido.");

        if (formData.confirmarEmail && formData.email !== formData.confirmarEmail)
            errores.push("Los correos no coinciden.");

        if (0 < formData.contraseña.length && formData.contraseña.length < 6)
            errores.push("La contraseña debe tener al menos 6 caracteres.");

        if (formData.confirmarContraseña && formData.contraseña !== formData.confirmarContraseña)
            errores.push("Las contraseñas no coinciden.");

        if (formData.telefono)
            if (!/^\d{9}$/.test(formData.telefono))
                errores.push("El teléfono debe tener 9 dígitos.");

        if (tipo !== "admin")
        {
            if (!formData.region)
                errores.push("Debes seleccionar una región!")

            if (!formData.comuna)
                errores.push("Debes seleccionar una comuna!")
        }

        return errores;
    }

    const handleSubmit = async (e: React.FormEvent) => 
    {
        e.preventDefault();

        const errores = validarFormRegistro(formData);

        if (errores.length > 0) 
        {
            alert("Errores:\n" + errores.join("\n"));
            return;
        }

        const usuarioService = new UsuarioApiService();
        const usuario = new Usuario()
            .setId(id)
            .setNombreUsuario(formData.nombreUsuario)
            .setEmail(formData.email)
            .setContraseña("")
            .setTelefono(formData.telefono)
            .setRegion(formData.region)
            .setComuna(formData.comuna)
            .setProfilePhoto(profilePhoto)
            .setTipo(tipo);

        const resultado = await usuarioService.update(id, usuario);

        if (resultado.success)
        {
            setFormData({
                nombreUsuario: nombre  || "No proporcionado",
                email: email  || "No proporcionado",
                confirmarEmail: "",
                contraseña: contraseña  || "No proporcionado",
                confirmarContraseña: "",
                telefono: telefono  || "",
                region: "",
                comuna: ""
            });

            setUsuario(usuario);
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
                            onClick={async (e) => 
                            {
                                const enviadoCorrecto = await handleSubmit(e);
                                if (enviadoCorrecto && onClick) onClick(e);
                            }}
                            type="submit">
                                Guardar
                        </Boton>

                        <Boton
                            className="boton-cancelar"
                            onClick={onClick}>
                                Cancelar
                        </Boton>
                    </div>
                </div>
            </form>
        </>
    );
}