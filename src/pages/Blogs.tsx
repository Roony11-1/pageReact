import { useEffect } from "react";
import { useState } from "react";
import { DisplayBlog } from "../components/DisplayBlog/DisplayBlog";
import { BlogApiService } from "../services/BlogApiService"
import type { Blog } from "../model/Blog";

export function Blogs()
{
    const [blogs, setBlogs] = useState<Blog[]>([])
    const [loading, setLoading] = useState(true);
    const blogService = new BlogApiService();

    useEffect(() => {
        const fetchBlogs = async () => 
          {
            const datos = await blogService.fetchAll();
            setBlogs(datos);
            setLoading(false)
          };
        
          fetchBlogs();
    }, []);

    if (loading) return <p>Cargando...</p>;
    if (blogs.length === 0) return <p>No hay blogs disponibles.</p>;
    
    return(
        <div>
          {blogs.map((p) => (
            <DisplayBlog key={p.getId()} blog={p} />
          ))}
        </div>
    )
}