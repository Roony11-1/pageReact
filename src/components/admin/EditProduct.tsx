import { useState } from "react";
import { useProductoService } from "../../context/ProductoServiceContext/UseProductoService";
import { Producto } from "../../model/Producto";
import { FormInput } from "../Formularios/FormInput/FormInput";
import { Boton } from "../Boton/Boton";

interface EditProductProps 
{
    producto: Producto;
    onCloseEdit?: () => void;
}

export function EditProduct({ producto, onCloseEdit }: EditProductProps) {
    const { productoService } = useProductoService();

    const [formData, setFormData] = useState({
        nombre: producto.getNombre() || "",
        codigo: producto.getCodigo() || "",
        marca: producto.getMarca() || "",
        descripcion: producto.getDescripcion() || "",
        categoria: producto.getCategoria() || "",
        precio: producto.getPrecio() || 0,
        cantidad: producto.getCantidad() || 0,
        destacado: producto.getDestacado() || false,
        oferta: producto.getOferta() || 0,
        imagen: producto.getImagen() || "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "number" ? Number(value) : value
        }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: checked
        }));
    };

    const validarProducto = (data: typeof formData): string[] => {
        const errores: string[] = [];

        if (!data.nombre.trim()) errores.push("El nombre del producto es obligatorio.");
        if (!data.codigo.trim()) errores.push("El código del producto es obligatorio.");
        if (!data.marca.trim()) errores.push("La marca del producto es obligatoria.");
        if (!data.descripcion.trim()) errores.push("La descripción del producto es obligatoria.");
        if (!data.categoria.trim()) errores.push("La categoría del producto es obligatoria.");
        if (data.precio <= 0) errores.push("El precio debe ser mayor que 0.");
        if (data.cantidad < 0) errores.push("La cantidad no puede ser negativa.");
        if (data.oferta < 0 || data.oferta > 1)
            errores.push("La oferta debe estar entre 0 y 1 (ej: 0.2 para 20%).");
        if (!data.imagen.trim()) errores.push("Debe incluir una URL de imagen.");

        return errores;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const errores = validarProducto(formData);

        if (errores.length > 0) {
            alert("Errores:\n" + errores.join("\n"));
            return;
        }

        const productoActualizado = new Producto()
            .setId(producto.getId())
            .setNombre(formData.nombre)
            .setCodigo(formData.codigo)
            .setMarca(formData.marca)
            .setDescripcion(formData.descripcion)
            .setCategoria(formData.categoria)
            .setPrecio(formData.precio)
            .setCantidad(formData.cantidad)
            .setDestacado(formData.destacado)
            .setOferta(formData.oferta)
            .setImagen(formData.imagen);

        const resultado = await productoService.update(producto.getId(), productoActualizado);

        alert(resultado.message);

        if (resultado.success) {
            onCloseEdit?.();
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="producto-admin">
                <FormInput
                    name="nombre"
                    label="Nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                />
                <FormInput
                    name="codigo"
                    label="Código"
                    value={formData.codigo}
                    onChange={handleChange}
                />
                <FormInput
                    name="marca"
                    label="Marca"
                    value={formData.marca}
                    onChange={handleChange}
                />
                <FormInput
                    name="descripcion"
                    label="Descripción"
                    value={formData.descripcion}
                    onChange={handleChange}
                />
                <FormInput
                    name="categoria"
                    label="Categoría"
                    value={formData.categoria}
                    onChange={handleChange}
                />
                <FormInput
                    name="precio"
                    label="Precio"
                    type="number"
                    value={formData.precio}
                    onChange={handleChange}
                />
                <FormInput
                    name="cantidad"
                    label="Cantidad"
                    type="number"
                    value={formData.cantidad}
                    onChange={handleChange}
                />
                <FormInput
                    name="oferta"
                    label="Oferta (0 a 1)"
                    type="number"
                    value={formData.oferta}
                    onChange={handleChange}
                />
                <FormInput
                    name="imagen"
                    label="URL Imagen"
                    value={formData.imagen}
                    onChange={handleChange}
                />
                <div className="form-checkbox">
                    <label>
                        <input
                            type="checkbox"
                            name="destacado"
                            checked={formData.destacado}
                            onChange={handleCheckboxChange}
                        />
                        Destacado
                    </label>
                </div>

                <div>
                    <Boton className="formulario" type="submit">
                        Guardar Cambios
                    </Boton>
                </div>
            </div>
        </form>
    );
}