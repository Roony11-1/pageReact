import { LocalStorageStrategy } from "../../utilities/LocalStorageStrategy";
import { UsuariosFalsos } from "../datos-pre-guardados/UsuariosFalsos";
import type { RepositoryInterface } from "./RepositoryInterface";
import type { Usuario } from "../../model/Usuario";

export class UsuarioRepository implements RepositoryInterface<Usuario>
{
    private storage = new LocalStorageStrategy("usuarios");

    constructor() 
    {
        // Inicializar con datos falsos si no hay usuarios
        if (this.storage.findAll().length === 0) 
            this.storage.guardar(UsuariosFalsos());
    }

    findAll(): any[] 
    {
        return this.storage.findAll();
    }

    findById(id: number): any | null 
    {
        const usuariosJson = this.findAll();
        return usuariosJson.find((u: any) => u.id === id) || null;
    }

    findByEmail(email: string): any | null
    {
        const usuariosJson = this.findAll();
        return usuariosJson.find((u: any) => u.email === email) || null;
    }

    save(usuario: Usuario): boolean
    {
        const usuariosActual = this.findAll();
        usuario.setId(usuariosActual.length > 0 ? usuariosActual[usuariosActual.length - 1].id + 1 : 1);
        usuariosActual.push(usuario);
        this.storage.guardar(usuariosActual);

        return true;
    }

    update(id: number, usuario: Usuario): boolean
    {
        const usuariosActual = this.findAll();
        const index = usuariosActual.findIndex(u => u.id === id);

        if (index === -1) 
            return false;

        usuariosActual[index] = usuario;
        this.storage.guardar(usuariosActual);

        return true;
    }

    deleteById(id: number): boolean 
    {
        const usuariosActual = this.findAll();
        const indice = usuariosActual.findIndex((u: any) => u.id === id);

        if (indice === -1)
            return false;

        usuariosActual.splice(indice, 1);
        this.storage.guardar(usuariosActual);

        return true;
    }
}