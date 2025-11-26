import { Producto } from "../../model/Producto";
import { useProductoService } from "../../context/ProductoServiceContext/UseProductoService";
import { AdminPanelBase, type AdminBaseView } from "./AdminPanelBase";
import { EditItem } from "../EditItem/EditItem";
import { editProductConfig } from "../EditItem/editProductConfig";
import { AdminPanelBotones } from "./AdminPanelBotones";

function AdminProductView({entity, onEdit, onDelete}: AdminBaseView<Producto>) 
{
    return (
        <div className="item-admin">
            <img src={entity.getImagen()} width={150} height={150} />
            <div>
                <hr />
                <p>Id: {entity.getId()}</p>
                <p>Codigo: {entity.getCodigo()}</p>
                <p>Nombre: {entity.getNombre()}</p>
                <p>Marca: {entity.getMarca()}</p>
                <p>Categoría: {entity.getCategoria()}</p>
                <hr />
                <p>Descripción: {entity.getDescripcion()}</p>
                <hr />
                <p>Precio: ${entity.getPrecio().toLocaleString("es-CL")}</p>
                <p>Cantidad: {entity.getCantidad()}</p>
                <p>Oferta: {entity.getOferta() === 0 ? "No" : (entity.getOferta()*100)+"%"}</p>
                <p>Destacado: {entity.getDestacado() ? "Si" : "No"}</p>
                <hr />
            </div>
            <AdminPanelBotones onDelete={onDelete} onEdit={onEdit} />
        </div>
    );
}

export function AdminPanelProducto() 
{
    const { productoService } = useProductoService();

    const crearProductoRandom = async (addItem: (p: Producto) => Promise<void>) => 
    {
        const randomName = "Producto" + Math.floor(Math.random() * 1000);
        const nuevo = new Producto()
        .setNombre(randomName)
        .setCodigo("COD-" + Math.floor(Math.random() * 10000))
        .setMarca("MarcaX")
        .setDescripcion("Generado automáticamente")
        .setCategoria("General")
        .setPrecio(Math.floor(Math.random() * 50000) + 1000)
        .setCantidad(Math.floor(Math.random() * 50) + 1)
        .setDestacado(false)
        .setOferta(0);

        await addItem(nuevo);
    };

    return (
        <AdminPanelBase<Producto>
            title="Productos"
            service={productoService}
            renderItem={(p, onEdit, onDelete) => (<AdminProductView entity={p} onEdit={onEdit} onDelete={onDelete} />)}
            renderEditor={(p, onCloseEdit) => (<EditItem item={p} config={editProductConfig} service={productoService} onCloseEdit={onCloseEdit} />)}
            onAddRandom={crearProductoRandom} />
    );
}
