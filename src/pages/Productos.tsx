import { Producto } from "../model/Producto";
import { useEffect } from "react";
import { useState } from "react";
import { DisplayProduct } from "../components/DisplayProduct/DisplayProduct";

import "../assets/css/Productos/productos.css"
import { useSearchParams } from "react-router-dom";
import { useProductoService } from "../context/ProductoServiceContext/UseProductoService";
import { Filtro } from "../assets/css/Productos/Filtro/Filtro";

export function Productos() 
{
  const [productos, setProductos] = useState<Producto[]>([])
  const [loading, setLoading] = useState(true);

  const { productoService } = useProductoService();

  const [searchParams] = useSearchParams();
  const categoria = searchParams.get("filtro");
    
  useEffect(() => 
    {
      const fetchProductos = async () => 
      {
        let datos;
        if (categoria)
          datos = await productoService.fetchByFiltro(categoria);
        else
          datos = await productoService.fetchAll();

        setProductos(datos);
        setLoading(false)
      };
            
    fetchProductos();
    }, [categoria, productoService]);

    if (loading) return <p>Cargando...</p>;

    if (productos.length === 0) 
      return(
        <div>
          <Filtro />
          <p>No hay productos disponibles.</p>
        </div>
      );

    return (
      <div className="catalogo-container">
        <Filtro />
        <div className="contenedor-productos">
          {productos.map((p) => <DisplayProduct key={p.id} producto={p} />)}
        </div>
      </div>

    );
}