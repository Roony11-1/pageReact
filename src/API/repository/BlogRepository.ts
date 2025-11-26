import { LocalStorageStrategy } from "../../utilities/LocalStorageStrategy";
import { BlogsFalsos } from "../datos-pre-guardados/BlogsFalsos";
import type { RepositoryInterface } from "./RepositoryInterface";
import type { Blog } from "../../model/Blog"

export class BlogRepository implements RepositoryInterface<Blog>
{
    private storage = new LocalStorageStrategy("blogs");

    constructor() 
    {
        // Inicializar con datos falsos si no hay usuarios
        if (this.storage.findAll().length === 0) 
            this.storage.guardar(BlogsFalsos());
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

    save(blog: Blog): boolean
    {
        const usuariosActual = this.findAll();
        blog.setId(usuariosActual.length > 0 ? usuariosActual[usuariosActual.length - 1].id + 1 : 1);
        usuariosActual.push(blog);
        this.storage.guardar(usuariosActual);

        return true;
    }

    update(id: number, blog: Blog): boolean
    {
        const blogsActuales = this.findAll();
        const index = blogsActuales.findIndex(u => u.id === id);

        if (index === -1) 
            return false;

        blogsActuales[index] = blog;
        this.storage.guardar(blogsActuales);

        return true;
    }

    deleteById(id: number): boolean 
    {
        const usuariosActual = this.findAll();
        const indice = usuariosActual.findIndex((u: any) => u.id === id);

        if (indice !== -1) 
        {
            usuariosActual.splice(indice, 1);
            this.storage.guardar(usuariosActual);
            return true;
        }
        
        return false;
    }
}