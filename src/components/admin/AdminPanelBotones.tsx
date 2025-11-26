import { Boton } from "../Boton/Boton";

interface AdminPanelBotonesProps
{
    onDelete?: () => void;
    onEdit?: () => void;
}

export function AdminPanelBotones( {onDelete, onEdit}:AdminPanelBotonesProps )
{
    return(
        <div className="admin-panel-btns">
            {onDelete && <Boton onClick={onDelete}>Borrar</Boton>}
            {onEdit && <Boton onClick={onEdit}>Editar</Boton>}
        </div>
    );
}