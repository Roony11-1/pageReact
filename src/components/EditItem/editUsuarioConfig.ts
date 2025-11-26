import { Usuario } from "../../model/Usuario";
import { UbicacionService } from "../../utilities/RegionComuna";
import { type EditItemConfig } from "./EditItem"
import { ValidacionesFormulario } from "./Validaciones";

export const editUsuarioConfig: EditItemConfig<Usuario> = 
{
    getInitialData: (u) => 
    ({
        nombre: u.getNombreUsuario(),
        email: u.getEmail(),
        telefono: u.getTelefono(),
        region: u.getRegion(),
        comuna: u.getComuna(),
        tipo: u.getTipo()
    }),
    buildEntity: (data, p) =>
        new Usuario()
            .setId(p.getId())
            .setNombreUsuario(data.nombre)
            .setEmail(data.email)
            .setTelefono(data.telefono)
            .setRegion(data.region)
            .setComuna(data.comuna)
            .setTipo(data.tipo)
            .setProfilePhoto(p.getProfilePhoto()),
    fields: 
    [
        { name: "nombre", label: "Nombre", 
            validate: (v) => 
                (
                    ValidacionesFormulario.obligatorio(v)
                )
        },
        { name: "email", label: "Correo", 
            validate: (v) => 
                (
                    ValidacionesFormulario.obligatorio(v) || 
                    ValidacionesFormulario.validarEmail(v)
                )
        },
        { name: "telefono", label: "Teléfono" },
        { 
            name: "region", label: "Región", type: "select",
            options: UbicacionService.getRegiones().map(r => ({ value: r, label: r }))
            
        },
        { 
            name: "comuna", label: "Comuna", type: "select", options: []
        },
        { name: "tipo", label: "Tipo", validate: (v) => 
                (
                    ValidacionesFormulario.obligatorio(v)
                )
        }
    ]
};
