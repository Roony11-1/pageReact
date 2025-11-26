import type { Venta } from "../../model/Venta";
import type { VentaService } from "../service/VentaService";

export class VentaController
{
    private ventaService: VentaService;

    constructor(ventaService: VentaService)
    {
        this.ventaService = ventaService;
    }

    findAll(): any[]
    {
        return this.ventaService.findAll();
    }

    findById(id: number): any | null
    {
        return this.ventaService.findById(id);
    }

    findByIdCliente(idCliente: number)
    {
        return this.ventaService.findByIdCliente(idCliente);
    }

    save(venta: Venta): boolean
    {
        return this.ventaService.save(venta);
    }

    update(id: number, venta: Venta): boolean
    {
        return this.ventaService.update(id, venta);
    }

    deleteById(id: number): boolean
    {
        return this.ventaService.deleteById(id);
    }
}