import { Usuario } from "../../model/Usuario";
import { LoginRequest } from "../../model/LoginRequest";
import { type UsuarioService } from "../service/UsuarioService";

export class UsuarioController
{
    private usuarioService: UsuarioService;
    constructor(usuarioService: UsuarioService)
    {
        this.usuarioService = usuarioService;
    }

    findAll(): any[]
    {
        return this.usuarioService.findAll();
    }

    findById(id: number): any | null
    {
        return this.usuarioService.findById(id);
    }

    findByEmail(email: string): any | null
    {
        return this.usuarioService.findByEmail(email);
    }

    save(usuario: Usuario): { success: boolean; message: string } 
    {
        return this.usuarioService.save(usuario);
    }

    update(id: number, usuario: Usuario): { success: boolean; message: string } 
    {
        return this.usuarioService.update(id, usuario);
    }

    deleteById(id: number): { success: boolean; message: string } 
    {
        return this.usuarioService.deleteById(id);
    }

    login(loginRequest: LoginRequest): { success: boolean; message: string; usuario?: Usuario } 
    {
        return this.usuarioService.login(loginRequest.getEmail(), loginRequest.getContraseña());
    }
}