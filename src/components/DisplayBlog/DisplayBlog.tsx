import { Blog } from "../../model/Blog";
import "../../assets/css/Blogs/DisplayBlog.css"

export function DisplayBlog({ blog }: { blog: Blog }) {
    return (
        <div className="blogContainer">
            <p>{blog.getTitulo()}</p>
            <p>Descripcion: {blog.getDescripcion()}</p>
            <p>URL: <a href={blog.getUrl()}>Ver Noticia</a></p>
            <img src={blog.getImagen()} alt={blog.getTitulo()} style={{ maxWidth: "200px" }} />
        </div>
    );
}
