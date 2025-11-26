import type { Producto } from "../../model/Producto";
import { type ProductoService } from "../service/ProductoService";

export class ProductoController
{
    private productoService: ProductoService;

    constructor(productoService: ProductoService)
    {
        this.productoService = productoService;
    }

    findAll(): Producto[]
    {
        return this.productoService.findAll();
    }

    findById(id: number): Producto | null
    {
        return this.productoService.findById(id);
    }

    findByDestacado(): Producto[]
    {
        return this.productoService.findByDestacado();
    }

    findByCategoria(categoria: string): Producto[]
    {
        return this.productoService.findByCategoria(categoria);
    }

    findByMarca(marca: string): Producto[]
    {
        return this.productoService.findByMarca(marca);
    }

    findByNombre(nombre: string): Producto
    {
        return this.productoService.findByNombre(nombre);
    }

    findProducto(filtro: string): Producto[]
    {
        return this.productoService.findProducto(filtro);
    }

    getMarcas(): string[]
    {
        return this.productoService.getMarcas();
    }

    getCategorias(): string[]
    {
        return this.productoService.getCategorias();
    }

    save(usuario: Producto): { success: boolean; message: string } 
    {
        return this.productoService.save(usuario);
    }

    update(id: number, producto: Producto): { success: boolean; message: string }
    {
        return this.productoService.update(id, producto);
    }

    deleteById(id: number): { success: boolean; message: string }
    {
        return this.productoService.deleteById(id);
    }
}