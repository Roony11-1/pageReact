import { useEffect, useState } from 'react';
import "../assets/css/Formulario/formulario.css"
import { FormSelect } from '../components/Formularios/FormSelect/FormSelect';
import { FormInput } from '../components/Formularios/FormInput/FormInput';

import { UbicacionService } from "../utilities/RegionComuna"
import { Usuario } from '../model/Usuario';
import { Boton } from '../components/Boton/Boton';
import { LoginSecurity } from '../components/Seguridad/LoginSecurity/LoginSecurity';
import { useUsuarioService } from '../context/UsuarioServiceContext/UseUsuarioService';

export function Registro() 
{
    const { usuarioService } = useUsuarioService();

    const [formData, setFormData] = useState({
        nombreUsuario: "",
        email: "",
        confirmarEmail: "",
        contraseña: "",
        confirmarContraseña: "",
        telefono: "",
        region: "",
        comuna: ""
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

        if (formData.email !== formData.confirmarEmail)
            errores.push("Los correos no coinciden.");

        if (formData.contraseña.length < 6)
            errores.push("La contraseña debe tener al menos 6 caracteres.");

        if (formData.contraseña !== formData.confirmarContraseña)
            errores.push("Las contraseñas no coinciden.");

        if (formData.telefono)
            if (!/^\d{9}$/.test(formData.telefono))
                errores.push("El teléfono debe tener 9 dígitos.");

        if (!formData.region)
            errores.push("Debes seleccionar una región!")

        if (!formData.comuna)
            errores.push("Debes seleccionar una comuna!")

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

        const usuario = new Usuario().setNombreUsuario(formData.nombreUsuario)
            .setEmail(formData.email)
            .setContraseña(formData.contraseña)
            .setTelefono(formData.telefono)
            .setRegion(formData.region)
            .setComuna(formData.comuna);

        const resultado = await usuarioService.saveUser(usuario);

        if (resultado)
        {
            setFormData({
                nombreUsuario: "",
                email: "",
                confirmarEmail: "",
                contraseña: "",
                confirmarContraseña: "",
                telefono: "",
                region: "",
                comuna: ""
            });
        }

        alert(resultado.message);
    };

    return (
        <LoginSecurity invitado>
            <h1>Página de Registro</h1>

            <form onSubmit={handleSubmit}>
                <div className='formularioContainer'>
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
                    <Boton
                        className='formulario'>Registrarse</Boton>
                </div>
            </form>
        </LoginSecurity>
    )
}