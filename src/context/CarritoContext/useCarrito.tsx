import { createContext, useContext } from "react";
import type { Carrito } from "../../model/Carrito";

export interface CarritoContextType
{
    carrito: Carrito;
    agregarUnidad: (productoId: number, cantidad: number) => void;
    eliminarUnidad: (productoId: number, cantidad: number) => void;
    limpiarCarrito: () => void;
}

export const CarritoContext = createContext<CarritoContextType | undefined>(undefined);

export const useCarrito = (): CarritoContextType =>
{
    const context = useContext(CarritoContext);

    if (!context)
        throw new Error("useCarrito debe usarse dentro de un CarritoProvider");

    return context;
}