import type { Venta } from "../../model/Venta";
import type { VentaRepository } from "../repository/VentaRepository";

export class VentaService
{
    private ventaRepository: VentaRepository

    constructor(ventaRepository: VentaRepository)
    {
        this.ventaRepository = ventaRepository;
    }

    findAll(): any[]
    {
        return this.ventaRepository.findAll();
    } 

    findById(id: number): any | null
    {
        return this.ventaRepository.findById(id);
    }

    findByIdCliente(idCliente: number): any[]
    {
        return this.ventaRepository.findByIdCliente(idCliente);
    }

    save(venta: Venta): boolean
    {
        return this.ventaRepository.save(venta);
    }

    update(id: number, venta: Venta): boolean
    {
        return this.ventaRepository.update(id, venta);
    }

    deleteById(id: number): boolean
    {
        return this.ventaRepository.deleteById(id);
    }
}