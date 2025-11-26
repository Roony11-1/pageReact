import type { Blog } from "../../model/Blog";
import { type BlogService } from "../service/BlogService";

export class BlogController
{
    private blogService: BlogService;

    constructor(blogService: BlogService)
    {
        this.blogService = blogService;
    }

    findAll(): Blog[]
    {
        return this.blogService.findAll();
    }

    findById(id: number): Blog | null
    {
        return this.blogService.findById(id);
    }

    save(usuario: Blog): boolean
    {
        return this.blogService.save(usuario);
    }

    deleteById(id: number): boolean
    {
        return this.blogService.deleteById(id);
    }
}