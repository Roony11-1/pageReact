import { Boton } from "../../Boton/Boton";

interface BotonesCarritoProps
{
    itemId: number;
    cantidad: number;
    agregarUnidad: (productoId: number, cantidad: number) => void;
    eliminarUnidad: (productoId: number, cantidad: number) => void;
}

export function BotonesCarrito( {itemId, cantidad, agregarUnidad, eliminarUnidad}: BotonesCarritoProps )
{
    return(
        <div className="item-carrito-btn">
            <Boton
                onClick={() => agregarUnidad(itemId, 1/2)}>
                    <img src="/carrito/cart-plus-svgrepo-com.svg" alt="Botón Agregar" />
            </Boton>
            <Boton
                onClick={() => eliminarUnidad(itemId, cantidad)}>
                    <img src="/carrito/cart-xmark-svgrepo-com.svg" alt="Botón Eliminar" />
            </Boton>
            {cantidad > 1 && 
                <Boton
                    onClick={() => eliminarUnidad(itemId, 1/2)}>
                        <img src="/carrito/cart-minus-svgrepo-com.svg" alt="Botón Descontar" />
                </Boton>
            }
        </div>
    );
}