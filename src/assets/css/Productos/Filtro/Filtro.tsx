import { Link } from "react-router-dom";
import { useProductoService } from "../../../../context/ProductoServiceContext/UseProductoService";
import { useEffect, useState } from "react";

export function Filtro()
{
    const { productoService } = useProductoService();

    const [marcas, setMarcas] = useState<string[]>([]);
    const [categorias, setCategorias] = useState<string[]>([]);

    useEffect(() => 
    {
        const cargarDatos = async () => 
        {
            const m = await productoService.getMarcas();
            const c = await productoService.getCategorias();

            setMarcas(m);
            setCategorias(c);
        };

        if (productoService) 
            cargarDatos();
    }, [productoService]);

    return(
        <div className="contenedor-filtros">
            <Link to={"/catalogo"}>Quitar Filtros</Link>

            <div>
                <h2>Selecciona una marca</h2>
                <div className="contenedor-marcas">
                    {marcas.map((m, index) => 
                    (
                        <Link key={index} to={`/catalogo/search?filtro=${m}`}>
                            <h2>{m}</h2>
                        </Link>
                    ))}
                </div>
            </div>

            <div>
                <h2>Selecciona una categoria</h2>
                <div className="contenedor-categorias">
                    {categorias.map((c, index) => 
                    (
                        <Link key={index} to={`/catalogo/search?filtro=${c}`}>
                            <h2>{c}</h2>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
