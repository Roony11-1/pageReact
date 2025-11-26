import { Producto } from "../../model/Producto"
import { type EditItemConfig } from "./EditItem"
import { ValidacionesFormulario } from "./Validaciones";

export const editProductConfig: EditItemConfig<Producto> = 
{
    getInitialData: (p) => 
    ({
        nombre: p.getNombre(),
        codigo: p.getCodigo(),
        marca: p.getMarca(),
        descripcion: p.getDescripcion(),
        categoria: p.getCategoria(),
        precio: p.getPrecio(),
        cantidad: p.getCantidad(),
        destacado: p.getDestacado(),
        oferta: (p.getOferta()*100),
        imagen: p.getImagen(),
    }),
    buildEntity: (data, p) =>
        new Producto()
            .setId(p.getId())
            .setNombre(data.nombre)
            .setCodigo(data.codigo)
            .setMarca(data.marca)
            .setDescripcion(data.descripcion)
            .setCategoria(data.categoria)
            .setPrecio(data.precio)
            .setCantidad(data.cantidad)
            .setDestacado(data.destacado)
            .setOferta(((data.oferta / 100)))
            .setImagen(data.imagen),
    fields: 
    [
        { 
            name: "nombre", label: "Nombre", validate: (v) => 
                (
                    ValidacionesFormulario.obligatorio(v)
                )
        },
        { 
            name: "codigo", 
            label: "Código", 
            validate: (v) => 
                (
                    ValidacionesFormulario.obligatorio(v)
                )
        },
        { 
            name: "marca", 
            label: "Marca", 
            validate: (v) => 
                (
                    ValidacionesFormulario.obligatorio(v)
                )
        },
        { 
            name: "descripcion", 
            label: "Descripción", 
            validate: (v) => 
                (
                    ValidacionesFormulario.obligatorio(v)
                )
        },
        { 
            name: "categoria", 
            label: "Categoría", 
            validate: (v) => 
                (
                    ValidacionesFormulario.obligatorio(v)
                )
        },
        { 
            name: "precio", 
            label: "Precio", 
            type: "number",
            validate: (v) => 
                (
                    ValidacionesFormulario.obligatorio(v)
                )
        },
        { 
            name: "cantidad", 
            label: "Cantidad", 
            type: "number",
            validate: (v) => 
                (
                    ValidacionesFormulario.obligatorio(v)
                )
        },
        { 
            name: "oferta", 
            label: "Oferta", 
            type: "number",
            validate: (v) => 
                (
                    ValidacionesFormulario.numeroPorcentaje(v)
                )
        },
        { 
            name: "imagen", 
            label: "Imagen", 
            validate: (v) => 
                (
                    ValidacionesFormulario.obligatorio(v)
                )
        },
        { 
            name: "destacado", 
            label: "Destacado", 
            type: "checkbox"
        }
    ]
};
