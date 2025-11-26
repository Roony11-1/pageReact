import type { Producto } from "../../model/Producto";
import { type ProductoRepository } from "../repository/ProductoRepository";

export class ProductoService 
{
    private productoRepository: ProductoRepository;

    constructor(productoRepository: ProductoRepository) 
    {
        this.productoRepository = productoRepository;
    }

    findAll(): Producto[]
    {
        return this.productoRepository.findAll();
    }

    findById(id: number): Producto | null
    {
        return this.productoRepository.findById(id);
    }

    findByDestacado(): Producto[]
    {
        return this.productoRepository.findByDestacado();
    }

    findByCategoria(categoria: string): Producto[]
    {
        return this.productoRepository.findByCategoria(categoria);
    }

    findAllByNombre(nombre: string): Producto[]
    {
        return this.productoRepository.findAllByNombre(nombre);
    }

    findByNombre(nombre: string): Producto
    {
        return this.productoRepository.findByNombre(nombre);
    }

    findByMarca(marca: string): Producto[]
    {
        return this.productoRepository.findByMarca(marca);
    }

    findProducto(filtro: string): Producto[] 
    {
        const productos = [
            ...this.findByCategoria(filtro),
            ...this.findAllByNombre(filtro),
            ...this.findByMarca(filtro)
        ];
    
        const productosUnicos = productos.filter(
            (producto, index, self) =>
                index === self.findIndex(p => p.id === producto.id)
        );
    
        return productosUnicos;
    }

    getMarcas(): string[] 
    {
        const productos = this.productoRepository.findAll();

        const marcas = productos.map(p => p.marca);
        const marcasUnicas = Array.from(new Set(marcas));

        return marcasUnicas;
    }

    getCategorias(): string[]
    {
        const productos = this.productoRepository.findAll();

        const categorias = productos.map(p => p.categoria);
        const categoriasUnicas = Array.from(new Set(categorias));

        return categoriasUnicas;
    }

    save(usuario: Producto): { success: boolean; message: string }
    {
        const resultado = this.productoRepository.save(usuario);

        if (resultado)
            return { success: true, message: "Se ha registrado el producto" }; 

        return { success: false, message: "No se ha podido registrar el producto" }; 
    }

    update(id: number, producto: Producto): { success: boolean; message: string }
    {
        const productoUpdatear = this.findById(id)

        if (!productoUpdatear)
                return { success: false, message: "No se ha encotnrado el producto" };

        if (this.productoRepository.update(id, producto))
            return { success: true, message: "Producto actualizado correctamente" };

        return { success: false, message: "No se ha podido actualizar el producto" };
    }

    deleteById(id: number): { success: boolean; message: string }
    {
        const resultado = this.productoRepository.deleteById(id);

        if (resultado)
            return { success: true, message: "Se ha borrado el producto" }; 

        return { success: false, message: "No se ha podido borrar el producto" }; 
    }
}