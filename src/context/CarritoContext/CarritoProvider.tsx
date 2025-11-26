import { useEffect, useState, type ReactNode } from "react";
import { Carrito } from "../../model/Carrito";
import { CarritoContext } from "./useCarrito";

interface CarritoProviderProps
{
    children: ReactNode;
}

export function CarritoProvider( {children}: CarritoProviderProps )
{
    const [loading, setLoading] = useState(true)
    const [carrito, setCarrito] = useState(() =>
    {
        const datosGuardados = localStorage.getItem("carrito");
        if (datosGuardados) 
        {
            const datos = JSON.parse(datosGuardados);

            const carritoGuardado = new Carrito();

            carritoGuardado.setItems(datos.items);

            return carritoGuardado;
        }

        return new Carrito();
    });

    /**
     * Metodo para hacer que cambie la referencia de carrito y useEffect actualice el localStorage
     * No se me ha ocurrido otra manera de hacerlo
     * @param prev recibe el carrito pasado
     * @returns retorna el carrito
     */
    function _clonarCarrito(prev: Carrito): Carrito 
    {
        const nuevo = new Carrito();
        nuevo.setid(prev.getId());
        nuevo.setItems([...prev.getItems()]);
        return nuevo;
    }

    /**
     * Metodo para agregar unidad al carrito, aumentara la unidad si ya existe para que sea reutilizable
     * puediendo agregar un item que no existia en el carrito a otro que ya existia aumentandole la cantidad
     * @param productoId id de referencia para reconstruir el objeto luego
     * @param cantidad cantidad que posee en el carrito
     */
    function agregarUnidad(productoId: number, cantidad: number)
    {
        setCarrito(prev =>
        {
            const nuevo = _clonarCarrito(prev);
            const items = nuevo.getItems();

            const existente = items.find(i => i.productoId === productoId);

            if (existente)
                existente.cantidad += cantidad;
            else
                items.push({productoId, cantidad});

            return nuevo;
        });
    }

    function eliminarUnidad(productoId: number, cantidad: number)
    {
        setCarrito(prev =>
        {
            const nuevo = _clonarCarrito(prev);

            const items = nuevo.getItems();

            const existente = items.find(i => i.productoId === productoId);

            if (existente) 
            {
                existente.cantidad -= cantidad;

                // Sabi ni perra idea pero funca
                const itemsActualizados = items.filter(i => i.cantidad > 0);

                nuevo.setItems(itemsActualizados);
            }

            return nuevo;
        });
    }

    function limpiarCarrito()
    {
        const nuevoCarrito = new Carrito();
        nuevoCarrito.setid(carrito.getId());

        // Actualiza el estado
        setCarrito(nuevoCarrito);

        // Limpia el localStorage manualmente
        localStorage.removeItem("carrito");
    }

    /**
     * Se llama 1 vez al montar el CarritoProvider guardando el estado
     * Luego se llama cada vez que se modifica la instancia carrito
     * asi guardando en localStorage los elementos
     */
    useEffect(() => 
    {
        localStorage.setItem("carrito", JSON.stringify({
            id: carrito.getId(),
            items: carrito.getItems(),}));
        setLoading(false);
    }, [carrito]);

    if (loading)
        return <h2>cargando...</h2>

    return(
        <CarritoContext.Provider value={ {carrito, agregarUnidad, eliminarUnidad, limpiarCarrito} }>
            {children}
        </CarritoContext.Provider>
    );
}