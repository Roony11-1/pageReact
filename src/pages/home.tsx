import { useEffect } from "react";
import { useState } from "react";
import '../assets/css/home/home.css';
import type { Producto } from "../model/Producto";
import { Link } from "react-router-dom";
import { Boton } from "../components/Boton/Boton";
import { Blog } from "../model/Blog";
import { BlogApiService } from "../services/BlogApiService";
import { CarruselDestacado } from "../components/CarruselDestacado/CarruselDestacado";
import { useProductoService } from "../context/ProductoServiceContext/UseProductoService";

export function Home() 
{
  const [productosDestacados, setProductosDestacados] = useState<Producto[]>([])
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const { productoService } = useProductoService();
  const blogService = new BlogApiService();

  useEffect(() => 
  {
    const fetchDestacados = async () => 
    {
      try 
      {
        const productosD = await productoService.fetchByDestacado();
        setProductosDestacados(productosD);

        try 
        {
          const blogsD = await blogService.fetchAll();
          setBlogs(blogsD);
        } 
        catch (e) 
        {
          console.warn("Blogs no disponibles aún");
          setBlogs([]);
        }
      }
      finally 
      {
        setLoading(false);
      }
    };

    fetchDestacados();
  }, []);

  return (
  <div className="home-container">
    <div className="titulo-home">
      <div className="banner">
        <h1>La mejor página para Gamers de verdad</h1>
        <p>
          Nuestro catálogo ofrece productos de la mejor calidad y precio.
          Descubre nuestras guías y productos exclusivos disponibles ahora.
        </p>
        <Link to="/catalogo"><Boton>Ver Productos</Boton></Link>
      </div>
      <div className="blogs-container">
        <h1>Noticias de esta semana</h1>
        <div className="blogs">
        {
            loading ? (
                <p>Cargando blogs...</p>
            ) : (
                blogs[0] && <CarruselDestacado item={blogs} interval={6000} />
            )
        }
        </div>
        <Link to="/blogs"><Boton>Ver Blogs</Boton></Link>
      </div>
    </div>
    <div className="destacado-home">
      <h1>Productos Destacados</h1>
      <div className="destacados">
        {
            !loading ? (
                productosDestacados[0] ? (
                    <CarruselDestacado item={productosDestacados} interval={3000} />
                ) : null
            ) : (
                <p>Cargando productos...</p>
            )
        }
      </div>
    </div>
  </div>
  )
}
