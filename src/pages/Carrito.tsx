import { useEffect, useState } from "react";
import { useCarrito } from "../context/CarritoContext/useCarrito";
import { useProductoService } from "../context/ProductoServiceContext/UseProductoService";
import type { Producto } from "../model/Producto";
import { Boton } from "../components/Boton/Boton";
import type { itemsType } from "../model/Carrito";

import "../assets/css/Carrito/carrito.css"
import { CarritoItem } from "../components/Carrito/CarritoItem/CarritoItem";
import { Link } from "react-router-dom";
import { useSesion } from "../context/SesionContext/UseSesion";
import { Venta } from "../model/Venta";
import { VentaApiService } from "../services/VentaApiService";

export function Carrito()
{
  const { carrito, limpiarCarrito } = useCarrito();
  const { sesion } = useSesion();

  const ventaApiService = new VentaApiService(sesion.getToken() ?? undefined);

  const { productoService } = useProductoService();

  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => 
  {
    const fetchProductos = async () => 
    {
      const datos = await productoService.fetchAll();

      setProductos(datos);
      setLoading(false)
      };
            
    fetchProductos();
  }, [carrito, productoService]);

  const listaProductos = carrito.getItems();

  if (listaProductos.length === 0)
    return (
      <>
        <strong>Carrito Vacío</strong>
        <br />
        <Link to={"/catalogo"}><Boton>Ir a el catálogo!</Boton></Link>
      </>
    );

  if (loading) return <p>Cargando...</p>;

  /**
   * Calcula el total 
   */
  const total = listaProductos.reduce((acumulado, item) => 
  {
    const producto = productos.find((p: Producto) => p.id === item.productoId);

    if (!producto)
    { 
      // quitamos ese elemento de listaProductos lo hago aca y que pasa que pereza compita aaaaaaa  
      carrito.setItems(listaProductos.splice(item.productoId, 1));
      return acumulado;
    }
      

    const precio = producto.getPrecio();
    const descuento = producto.getOferta() ?? 0;
    const subtotal = descuento === 0 ? (precio * item.cantidad) : (precio * (1 - descuento) * item.cantidad);

    return acumulado + subtotal;
  }, 0);

  const handlePagar = () =>
  {
    if (!sesion.getIdUsuarioActivo())
    {
      alert("Para proceder al pago debes estar logeado!");
      return;
    }

    if (carrito.getItems().length === 0)
    {
      alert("Primero agrega productos al carrito we");
      return;
    }
      
    const venta = new Venta().setIdCliente(sesion.getIdUsuarioActivo())
      .setVentaProductos(carrito.getItems()).setTotal(total);
      
    if (confirm(`Vas a pagar $${total.toLocaleString("es-CL")}`))
    {
      alert("Buena, confío que me pagaste. Toma tus productos =) Te llegan en 45 días hábiles.");
      ventaApiService.save(venta);
      limpiarCarrito();
    }
    else
      alert("Si no quieres no te obligo che");
  }

  return (
    <div className="contenedor">
      <div className="contenedor-items">
        {listaProductos.map((item: itemsType) => 
        {
          const producto = productos.find((p: Producto) => p.id === item.productoId);
          return <CarritoItem key={item.productoId} producto={producto || null} />;
        })}
      </div>
      <hr />
      <Boton
        onClick={handlePagar}>Ir a Pagar</Boton>
      <h2>Total: ${total.toLocaleString("es-CL")}</h2>
    </div>
  );
}