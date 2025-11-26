import type { Venta } from "../../model/Venta";
import { LocalStorageStrategy } from "../../utilities/LocalStorageStrategy";
import type { RepositoryInterface } from "./RepositoryInterface";

export class VentaRepository implements RepositoryInterface<Venta>
{
    private storage = new LocalStorageStrategy("ventas")

    constructor()
    {

    }

    findAll(): any[] 
    {
        return this.storage.findAll();
    }

    findById(id: number): any | null 
    {
        const ventasJson = this.findAll();
        return ventasJson.find((u: any) => u.id === id) || null;
    }

    findByIdCliente(idCliente: number) : Venta[]
    {
        const ventasJson = this.findAll();
        return ventasJson.filter((v: any) => v.idCliente === idCliente);
    }

    save(venta: Venta): boolean
    {
        const ventasActuales = this.findAll();
        venta.setId(ventasActuales.length > 0 ? ventasActuales[ventasActuales.length - 1].id + 1 : 1);
        ventasActuales.push(venta);
        this.storage.guardar(ventasActuales);

        return true;
    }

    update(id: number, entity: Venta): boolean 
    {
        const usuariosActual = this.findAll();
        const index = usuariosActual.findIndex(u => u.id === id);

        if (index === -1) 
            return false;

        usuariosActual[index] = entity;
        this.storage.guardar(usuariosActual);

        return true;
    }

    deleteById(id: number): boolean 
    {
        const usuariosActual = this.findAll();
        const indice = usuariosActual.findIndex((u: any) => u.id === id);

        if (indice === -1)
            return false;

        usuariosActual.splice(indice, 1);
        this.storage.guardar(usuariosActual);

        return true;
    }
}