import { ModeloBase } from "./ModeloBase";

export class Producto extends ModeloBase
{
    id: number;
    codigo: string;
    nombre: string;
    marca: string;
    descripcion: string;
    categoria: string
    precio: number;
    cantidad: number;
    imagen: string
    destacado: boolean;
    oferta: number;

    constructor()
    {
        super();
        this.id = 0;
        this.codigo = "Ninguno";
        this.nombre = "Ninguno";
        this.marca = "Ninguno"
        this.descripcion = "Ninguno";
        this.categoria = "Ninguno";
        this.precio = 0;
        this.cantidad = 0;
        this.imagen = "../../public/productos/istockphoto-1396814518-612x612.jpg";
        this.destacado = false;
        this.oferta = 0;
    }

    setId(id: number) { this.id = id; return this; }
    setCodigo(codigo: string) { this.codigo = codigo; return this; }
    setNombre(nombre: string) { this.nombre = nombre; return this; }
    setMarca(marca: string) { this.marca = marca; return this; }
    setDescripcion(descripcion: string) { this.descripcion = descripcion; return this; }
    setCategoria(categoria: string) { this.categoria = categoria; return this; }
    setPrecio(precio: number) { this.precio = precio; return this; }
    setCantidad(cantidad: number) { this.cantidad = cantidad; return this; }
    setImagen(imagen: string) { this.imagen = imagen; return this; }
    setDestacado(destacado: boolean) { this.destacado = destacado; return this; }
    setOferta(oferta: number) { this.oferta =  oferta; return this; }

    getId(): number { return this.id; }
    getCodigo(): string { return this.codigo; }
    getNombre(): string { return this.nombre; }
    getMarca(): string { return this.marca; }
    getDescripcion(): string { return this.descripcion; }
    getCategoria(): string { return this.categoria; }
    getPrecio(): number { return this.precio; }
    getCantidad(): number { return this.cantidad; }
    getImagen(): string { return this.imagen; }
    getDestacado(): boolean { return this.destacado; }
    getOferta(): number { return this.oferta; }
    isOferta(): boolean { return this.oferta !== 0; }
}