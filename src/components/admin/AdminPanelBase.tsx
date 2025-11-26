import { useEffect, useState, type ReactElement } from "react";
import { Boton } from "../Boton/Boton";
import "../../assets/css/PanelAdmin/paneladmin.css";

export interface AdminBaseView<T>
{
    entity: T;
    onEdit?: () => void;
    onDelete?: () => void;
}

export interface AdminPanelBaseProps<T>
{
    service:
    {
        fetchAll: () => Promise<T[]>;
        save: (item: T) => Promise<any>;
        update: (id: number, item: T) => Promise<any>;
        deleteById: (id: number) => Promise<any>
    }

    onAddRandom?: (addItem: (item: T) => Promise<void>) => Promise<void>;

    renderItem: (item: T, onEdit: () => void, onDelete: () => void) => ReactElement;
    renderEditor?: (item: T, onCloseEdit: () => void) => ReactElement;
    title: string;
}

export function AdminPanelBase<T>( {service, onAddRandom, renderItem, renderEditor, title}: AdminPanelBaseProps<T>) 
{
    const [items, setItems] = useState<T[]>([]);
    const [loading, setLoading] = useState(true);
    const [editId, setEditId] = useState<number | null>(null);

    const fetchItems = async () => 
    {
        const data = await service.fetchAll();
        setItems(data);
        setLoading(false);
    };

    useEffect(() => 
    {
        fetchItems();
    }, []);

    const handleDelete = async (id: number) => 
    {
        if (!confirm("¿Seguro que deseas eliminar este elemento?")) 
            return;
        const res = await service.deleteById(id);
        alert(res.message);
        await fetchItems();
    };

    const handleCloseEdit = async () => 
    {
        setEditId(null);
        await fetchItems();
    };

    const handleAddRandom = async () => 
    {
        if (!onAddRandom) 
            return;
        await onAddRandom(async (item) => 
        {
            await service.save(item);
            await fetchItems();
        });
    };

    if (loading) return <p>Cargando {title.toLowerCase()}...</p>;

    return (
        <div className="contenedor-admin">
            <div className="contenedor-admin-header">
                <h2>{title}</h2>

                {onAddRandom && (
                    <Boton onClick={handleAddRandom}>
                        Agregar {title}
                    </Boton>
                )}
            </div>
            <div className="contenedor-admin-body">
                {items.map((item: any) =>
                    editId === item.getId() ? 
                    <div key={item.getId()}>
                        {renderEditor?.(item, handleCloseEdit)}
                    </div> : 
                    <div key={item.getId()}>
                        {renderItem(item, () => setEditId(item.getId()), () => handleDelete(item.getId()))}
                    </div>
                )}
            </div>
        </div>
    );
}
