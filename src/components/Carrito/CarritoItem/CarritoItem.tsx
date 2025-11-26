import "../../../assets/css/Carrito/carrito.css"
import { useCarrito } from "../../../context/CarritoContext/useCarrito";
import type { Producto } from "../../../model/Producto";
import { BotonesCarrito } from "../BotonesCarrito/BotonesCarrito";

interface CarritoItemProps
{
    producto: Producto | null;
}

export function CarritoItem({producto}: CarritoItemProps)
{
    const { carrito, agregarUnidad, eliminarUnidad } = useCarrito();

    if (producto)
    {

    const item = carrito.getItems().find(i => i.productoId === producto.getId())
    const enOferta = producto.isOferta();
    const oferta = (producto.getOferta());

        if (item)

            return(
                <div className="item-carrito">
                    {enOferta && <strong>Oferta: {oferta*100}%</strong>}
                    <img src={producto.getImagen()} />
                    <strong>{producto.nombre}</strong><br />
                    <span>Precio: ${producto?.precio.toLocaleString("es-CL") ?? "N/A"}</span><br />
                    <span>Cantidad: {item.cantidad}</span><br />
                    <span>
                        SubTotal: $
                        {(producto.precio * (1 - oferta) * item.cantidad).toLocaleString("es-CL")}
                        {enOferta && (
                            <span style={{ textDecoration: "line-through", marginLeft: "5px", color: "#888" }}>
                                [${(producto.precio * item.cantidad).toLocaleString("es-CL")}]
                            </span>
                        )}
                    </span>
                    <hr />
                    <BotonesCarrito
                        itemId={item.productoId}
                        cantidad={item.cantidad}
                        agregarUnidad={agregarUnidad}
                        eliminarUnidad={eliminarUnidad} />
                </div>
            );
    }
    else
        return null; // No dibuja nada
}