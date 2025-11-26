import type { Producto } from "../../model/Producto";

interface VentaItemProps
{
    producto: Producto | null;
    cantidad: number;
}

export function VentaItem( {producto, cantidad}: VentaItemProps )
{
    if (!producto)
        return <h1>Producto desconocido!</h1>

    const enOferta = producto.isOferta();
    const oferta = (producto.getOferta());

    return(
        <div>
            <hr />
            <h4>Producto: {producto.getNombre()}</h4>
            <h5>Cantidad: {cantidad}</h5>
            <span>
                SubTotal: $
                {(producto.precio * (1 - oferta) * cantidad).toLocaleString("es-CL")}
                    {enOferta && (
                        <span style={{ textDecoration: "line-through", marginLeft: "5px", color: "#888" }}>
                            [${(producto.precio * cantidad).toLocaleString("es-CL")}]
                        </span>
                )}
            </span>
        </div>
    );
}