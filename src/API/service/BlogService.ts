import type { Blog } from "../../model/Blog";
import { type BlogRepository } from "../repository/BlogRepository";

export class BlogService 
{
    private blogRepository: BlogRepository;

    constructor(blogRepository: BlogRepository) 
    {
        this.blogRepository = blogRepository;
    }

    findAll(): Blog[]
    {
        return this.blogRepository.findAll();
    }

    findById(id: number): Blog | null
    {
        return this.blogRepository.findById(id);
    }

    save(blog: Blog): boolean
    {
        return this.blogRepository.save(blog);
    }

    deleteById(id: number): boolean
    {
        return this.blogRepository.deleteById(id);
    }
}