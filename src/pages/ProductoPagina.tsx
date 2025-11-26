import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Producto } from "../model/Producto";

import "../assets/css/ProductoPagina/productopagina.css"
import { Boton } from "../components/Boton/Boton";
import { RelatedProduct } from "../components/RelatedProduct/RelatedProduct";
import { useProductoService } from "../context/ProductoServiceContext/UseProductoService";
import { useCarrito } from "../context/CarritoContext/useCarrito";
import { BotonesCarrito } from "../components/Carrito/BotonesCarrito/BotonesCarrito";

export function ProductoPagina()
{
    const [producto, setProducto] = useState<Producto | null>();
    const [productosRelacionados, setProductosRelacionados] = useState<Producto[]>();
    const [loading, setLoading] = useState(true);

    const { productoService } = useProductoService();

    const [searchParams] = useSearchParams();
    const nombre = searchParams.get("nombre");

    useEffect(() => 
    {
        if (!nombre) 
            return;

        // Metodo custom para este componente
        productoService.fetchProductoConRelacionados(nombre)
        .then(({ producto, relacionados }) => 
        {
            setProducto(producto);
            setProductosRelacionados(relacionados);
            setLoading(false)
        });
    }, [nombre, productoService]);


    if (loading) return <p>Cargando Producto...</p>;

    if (!producto)
        return(
            <h1>No hay productos asociados a ese nombre</h1>
    );

    const enOferta = producto.isOferta();
    const oferta = (producto.getOferta());

    return (
        <div className="displayer-producto">
            <div className="displayer-imagen">
                <img
                    src={producto.getImagen()} />
            </div>
            <div className="displayer-info">
                <div className="info-header">
                    <strong>{producto.getNombre()}</strong><br />
                    <strong>{producto.getMarca()}</strong><br /><br /><hr />
                    {enOferta && <strong>Oferta: {oferta*100}%<hr /></strong>}
                </div>
                <div className="info-body">
                    <p>{producto.getDescripcion()}</p>
                                <p>
                {enOferta ? (
                    <div>
                        <span
                            style={{
                            textDecoration: "line-through",
                            marginLeft: "5px",
                            color: "#888"}}>
                                [${producto.precio.toLocaleString("es-CL")}]
                        </span>
                        <strong>${(producto.precio*(1-oferta)).toLocaleString("es-CL")}</strong>
                    </div>
                ) : (
                    <span>
                        ${producto.precio.toLocaleString("es-CL")}
                    </span>
                )}
            </p>
                </div>
                <div className="info-footer">
                    <InfoFooter 
                        producto={producto} />
                </div>
            </div>
            <div className="displayer-parecidos">
                <h1>Productos Relacionados</h1>
                <div className="parecidos">
                    {productosRelacionados && productosRelacionados.length > 0 ? (
                        productosRelacionados.map((p) => (
                            <RelatedProduct key={p.getId()} producto={p} />
                        ))
                    ) : (
                        <p>No hay productos relacionados</p>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Link to={"/catalogo"}><Boton>Volver al catálogo</Boton></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

interface InfoFooterProps {
    producto: Producto;
}

// Para manejar el estado diferente
function InfoFooter({ producto }: InfoFooterProps) 
{
    const { carrito, agregarUnidad,  eliminarUnidad } = useCarrito();

    const enCarrito = carrito.existeEnElCarrito(producto.getId());

    if (enCarrito) 
    {
        const itemEnCarrito = carrito.getItems().find(p => p.productoId === producto.getId());
        const cantidad = itemEnCarrito?.cantidad ?? 0;

        // Parece raro sabes pero la aplicacion hace esto dos veces y no me voy a perder viendo porque
        // le sumo 1/2 y se acabo sabes! ahora suma 1
        return (
            <>
                <h2>Cantidad en carrito: {cantidad}</h2>
                <BotonesCarrito
                    itemId={producto.getId()}
                    cantidad={cantidad}
                    agregarUnidad={agregarUnidad}
                    eliminarUnidad={eliminarUnidad} />
            </>
        );
    }

    if (producto.getCantidad() > 0) 
    {

        return (
            <div>
                <Boton onClick={() => agregarUnidad(producto.getId(), 1)}>
                    Añadir al carrito
                </Boton>
                <p>Cantidad: {producto.getCantidad()}</p>
            </div>
        );
    } 
    else
        return <h2 className="producto-agotado">Agotado</h2>;
}