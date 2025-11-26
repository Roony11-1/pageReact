import { Boton } from '../components/Boton/Boton';
import { FormInput } from '../components/Formularios/FormInput/FormInput';
import '../css/contacto.css'
import {useState} from "react";
export function Contacto() {
    const [nombre,setNombre]=useState('')
    const [mensaje,setMensaje]=useState('')
    const [correo,setCorreo]=useState('')
    const [respuesta,setRespuesta]=useState('')

    const enviarForm=(e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        console.log(mensaje)
        setRespuesta(`¡Gracias por tu mensaje ${nombre}, de igual forma no haremos caso!`)
    }
    return (
        
        <form onSubmit={enviarForm}>
        <div className='contacto'>   
            <h1>FORMULARIO DE CONTACTO</h1>
            <img src="/public/Logo_level-Up-sin-fondo.png" alt="" />
            <FormInput
                role="nombre"
                name='nombre'
                value={nombre}
                onChange={(e)=>setNombre(e.target.value)}
                label='nombre'
             />   
            <FormInput
                name='correo'
                value={correo}
                onChange={(e)=>setCorreo(e.target.value)}
                label='correo'
             /> 
            <FormInput
                role="mensaje"
                name='mensaje'
                value={mensaje}
                onChange={(e)=>setMensaje(e.target.value)}
                label='mensaje'
             /> 
            <Boton type="submit" className='boton-enviar'>Enviar</Boton>
        </div>
            {respuesta && <p role="alert">{respuesta}</p>}
        </form>



    )
}
export default Contacto