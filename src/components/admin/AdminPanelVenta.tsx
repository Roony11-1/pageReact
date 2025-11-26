import { AdminPanelBase, type AdminBaseView } from "./AdminPanelBase";
import { AdminPanelBotones } from "./AdminPanelBotones";
import { Venta, VentaProductoRequest } from "../../model/Venta";
import { VentaApiService } from "../../services/VentaApiService";
import type { Producto } from "../../model/Producto";
import { useEffect, useState } from "react";
import { useProductoService } from "../../context/ProductoServiceContext/UseProductoService";
import { VentaItem } from "../VentaItem/VentaItem";
import { useSesion } from "../../context/SesionContext/UseSesion";

function AdminVentaView({entity}: AdminBaseView<Venta>) 
{
    const [loading, setLoading] = useState(true);
    const [productos, setProductos] = useState<Producto[]>([]);
    const { productoService } = useProductoService();
    const listaProductos = entity.getVentaProductos();

    useEffect(() => 
    {
        const fetchProductos = async () => 
        {
        const datos = await productoService.fetchAll();

            setProductos(datos);
            setLoading(false)
        };
                
        fetchProductos();
    }, [productoService]);

    if (loading) return <p>Cargando...</p>;

    return (
        <div className="item-admin">
            <div>
                <p>ID: {entity.getId()}</p>
                <p>ID cliente: {entity.getIdCliente()}</p>
                <div>
                    {listaProductos.map((item: VentaProductoRequest) => 
                    {
                    const producto = productos.find((p: Producto) => p.id === item.producto.id);
                    return <VentaItem key={item.producto.id} producto={producto || null} cantidad={item.cantidad} />;
                    })}
                </div>
                <hr />
                <div>
                    <h1>Total: ${entity.getTotal().toLocaleString("es-CL")}</h1>
                </div>
            </div>
            <AdminPanelBotones />
        </div>
    );
}

export function AdminPanelVenta() 
{
    const { sesion } = useSesion();
    const ventaApiService = new VentaApiService(sesion.getToken() ?? undefined);

    return (
        <AdminPanelBase<Venta>
            title="Ventas"
            service={ventaApiService}
            renderItem={(p) => (<AdminVentaView entity={p} />)} />
    );
}
