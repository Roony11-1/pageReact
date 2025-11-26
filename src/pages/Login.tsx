import { useState } from "react";
import { LoginRequest } from "../model/LoginRequest";
// Manejo de la sesion
import { useSesion } from "../context/SesionContext/UseSesion";

import "../assets/css/Formulario/formulario.css"
import { FormInput } from "../components/Formularios/FormInput/FormInput";
import { Boton } from "../components/Boton/Boton";
import { LoginSecurity } from "../components/Seguridad/LoginSecurity/LoginSecurity";
import { useUsuarioService } from "../context/UsuarioServiceContext/UseUsuarioService";
import type { ApiResponseDTO } from "../model/dto/ApiResponseDTO";
import type { AuthResponseDTO } from "../model/dto/AuthResponseDTO";

export function Login() 
{
    const { usuarioService } = useUsuarioService();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const { sesionLogin } = useSesion();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => 
    {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    function validarFormRegistro(formData: any): string[] 
    {
        const errores: string[] = [];

        if (!formData.email)
            errores.push("El correo es obligatorio.");

        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email))
            errores.push("El correo electrónico no es válido.");

        if (!formData.password)
            errores.push("La contraseña es obligatoria.");

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

        const loginRequest: LoginRequest = new LoginRequest(formData.email, formData.password);

        const resultado: ApiResponseDTO<AuthResponseDTO> = await usuarioService.login(loginRequest);

        if (resultado.data) 
        {
            setFormData({
                email: "",
                password: ""
            });

            sesionLogin(resultado.data.id, resultado.data.token);
        }

        alert(resultado.message);
    };

    return (
        <LoginSecurity invitado>
            <h1>Iniciar Sesión</h1>
            <form onSubmit={handleSubmit}>
                <div className="formularioContainer">
                    <FormInput 
                        name='email'
                        label='Correo Electrónico'
                        onChange={handleChange}
                        value={formData.email} />
                    <FormInput 
                        name='password'
                        label='Contraseña'
                        onChange={handleChange}
                        value={formData.password} />
                    <Boton
                        className='formulario'>Iniciar Sesión</Boton>
                </div>
            </form>
        </LoginSecurity>
    );
}
