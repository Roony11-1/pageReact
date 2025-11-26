import { Usuario } from "../../model/Usuario";
import { type UsuarioRepository } from "../repository/UsuarioRepository";

export class UsuarioService 
{
    private usuarioRepository: UsuarioRepository;

    constructor(usuarioRepository: UsuarioRepository) 
    {
        this.usuarioRepository = usuarioRepository;
    }

    findAll(): any[]
    {
        return this.usuarioRepository.findAll();
    }

    findById(id: number): any | null
    {
        return this.usuarioRepository.findById(id);
    }

    findByEmail(email: string): any | null
    {
        return this.usuarioRepository.findByEmail(email);
    }

    save(usuario: Usuario): { success: boolean; message: string }
    {
        const email = usuario.getEmail();

        if (!email) 
            return { success: false, message: "Email vacío" };

        const existente = this.findByEmail(email);

        if (existente)
            return { success: false, message: "Correo ya registrado" };

        if (this.usuarioRepository.save(usuario))
            return { success: true, message: "Usuario registrado correctamente" };

        return { success: false, message: "No se ha podido registrar el usuario" };
    }

    update(id: number, usuario: Usuario): { success: boolean; message: string }
    {
        const usuarioUpdatear = this.findById(id)

        if (!usuarioUpdatear)
                return { success: false, message: "No se ha encotnrado el usuario" };
        
        const existente = this.findByEmail(usuarioUpdatear.email);

        if (existente && existente.id ==! id)
            return { success: false, message: "Correo ya registrado" };

        if (this.usuarioRepository.update(id, usuario))
            return { success: true, message: "Usuario actualizado correctamente" };

        return { success: false, message: "No se ha podido actualizar el usuario" };
    }

    deleteById(id: number): { success: boolean; message: string }
    {
        const borrado = this.usuarioRepository.deleteById(id);
        
        if (borrado)
            return { success: true, message: "Se borro el usuario con id: "+id };

        return { success: false, message: "No se ha podido borrar el usuario" };
    }
    
    login(email: string, password: string): { success: boolean; message: string; usuario?: Usuario } 
    {
        if (!email || !password)
            return { success: false, message: "Email o contraseña vacíos" };

        const usuario = this.findByEmail(email);

        if (!usuario)
            return { success: false, message: "Correo no encontrado" };

        if (usuario.contraseña !== password)
            return { success: false, message: "Contraseña incorrecta" };

        return { success: true, message: "Inicio de sesión exitoso", usuario: usuario };
    }
}