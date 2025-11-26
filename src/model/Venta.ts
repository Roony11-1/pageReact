import type { itemsType } from "./Carrito";
import { ModeloBase } from "./ModeloBase";

export class VentaProductoRequest
{
    producto: { id: number };
    cantidad: number;

    constructor(productoId: number, cantidad: number)
    {
        this.producto = { id: productoId };
        this.cantidad = cantidad;
    }
}

export class Venta extends ModeloBase
{
    id: number;
    idCliente: number | null;
    ventaProductos: VentaProductoRequest[];
    total: number;

    constructor()
    {
        super();
        this.id = 0;
        this.idCliente = 0;
        this.ventaProductos = [];
        this.total = 0;
    }

    setId(id: number) { this.id = id; return this; }
    setIdCliente(idCliente: number | null) { this.idCliente = idCliente; return this; }
    setVentaProductos(items: itemsType[])
    {
        this.ventaProductos = items.map(item => new VentaProductoRequest(item.productoId, item.cantidad));
        return this;
    }
    setTotal(total: number) { this.total = total; return this; }

    getId() { return this.id; }
    getIdCliente() { return this.idCliente; }
    getVentaProductos() { return this.ventaProductos; }
    getTotal() { return this.total; }
}