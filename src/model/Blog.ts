import { ModeloBase } from "./ModeloBase";

export class Blog extends ModeloBase
{
    private id:number;
    private titulo:string;
    private descripcion:string;
    private imagen:string;
    private url:string;

    constructor()
    {
        super();
        this.id = 0;
        this.titulo = `Noticia de la semana! N°${this.id}`;
        this.descripcion = 'Sin Descripción'
        this.imagen = "../../public/productos/istockphoto-1396814518-612x612.jpg";
        this.url = "Sin URL";
    }

    setId(id: number) {this.id = id; return this;}
    setTitulo(titulo: string) {this.titulo = titulo; return this;}
    setTituloAutomatico() { this.titulo = `Noticia de la semana! N°${this.id}`; return this;}
    setDescripcion(descripcion: string) {this.descripcion = descripcion; return this;}
    setImagen(imagen: string) {this.imagen = imagen; return this;}
    setUrl(url: string) {this.url = url; return this;}

    getId():number {return this.id;}
    getTitulo():string {return this.titulo;}
    getDescripcion():string {return this.descripcion;}
    getImagen():string {return this.imagen;}
    getUrl():string {return this.url;}
}