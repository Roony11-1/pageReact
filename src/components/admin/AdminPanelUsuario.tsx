import { AdminPanelBase, type AdminBaseView } from "./AdminPanelBase";
import { Usuario } from "../../model/Usuario";
import { useUsuarioService } from "../../context/UsuarioServiceContext/UseUsuarioService";
import { EditItem } from "../EditItem/EditItem";
import { editUsuarioConfig } from "../EditItem/editUsuarioConfig";
import { AdminPanelBotones } from "./AdminPanelBotones";

function AdminUsuarioView({entity, onEdit, onDelete}: AdminBaseView<Usuario>) 
{
    return (
        <div className="item-admin">
            <img src={entity.getProfilePhoto()} width={150} height={150}  />
            <div>
                <hr />
                <p>id: {entity.getId()}</p>
                <hr />
                <p>Nombre de usuario: {entity.getNombreUsuario()}</p>
                <p>Correo Electrónico: {entity.getEmail()}</p>
                <hr />
                <p>Teléfono: {entity.getTelefono()}</p>
                <p>Región: {entity.getRegion()}</p>
                <p>Comuna: {entity.getComuna()}</p>
                <p>Tipo: {entity.getTipo()}</p>
                <hr />
            </div>
            <AdminPanelBotones onDelete={onDelete} onEdit={onEdit} />
        </div>
    );
}

export function AdminPanelUsuario() 
{
    const { usuarioService } = useUsuarioService();

    const crearUsuarioRandom = async (addItem: (p: Usuario) => Promise<void>) => 
    {
        const randomName = "Usuario" + Math.floor(Math.random() * 1000);
        const usuarioRandom = new Usuario()
            .setNombreUsuario(randomName)
            .setEmail(randomName+"@gmail.com")
            .setContraseña("123456")
            .setTelefono("995970988")
            .setRegion("Chile")
            .setComuna("Santiago")
            .setTipo("usuario")

            await addItem(usuarioRandom)
    };

    return (
        <AdminPanelBase<Usuario>
            title="Usuarios"
            service={usuarioService}
            renderItem={(p, onEdit, onDelete) => (<AdminUsuarioView entity={p} onEdit={onEdit} onDelete={onDelete} />)}
            renderEditor={(p, onCloseEdit) => (<EditItem item={p} config={editUsuarioConfig} service={usuarioService} onCloseEdit={onCloseEdit} />)}
            onAddRandom={crearUsuarioRandom} />
    );
}
