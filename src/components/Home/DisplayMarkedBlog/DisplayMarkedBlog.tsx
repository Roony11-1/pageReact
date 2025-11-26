import type { Blog } from "../../../model/Blog";

import "../../../assets/css/Home/DisplayMarked/blog.css"

export function DisplayMarkedBlogs( {blog}: {blog: Blog} )
{
    return (
        <a
            href={blog.getUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="blog-destacado"
        >
            <div className="blog-destacado">
                <img src={blog.getImagen()} alt={blog.getTitulo()} />
            </div>
        </a>
    );
}