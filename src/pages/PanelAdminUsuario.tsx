import { useEffect, useState } from "react";
import "../assets/css/PanelAdmin/paneladmin.css";

import { Usuario } from "../model/Usuario";
import { LoginSecurity } from "../components/Seguridad/LoginSecurity/LoginSecurity";
import { AdminSecurity } from "../components/Seguridad/AdminSecurity/AdminSecurity";
import { DisplayUser, EditUser } from "../components/DisplayUser/DisplayUser";
import { Boton } from "../components/Boton/Boton";
import { useSesion } from "../context/SesionContext/UseSesion";
import { useUsuarioService } from "../context/UsuarioServiceContext/UseUsuarioService";

/**
 * Panel administrativo genérico para gestionar usuarios.
 * Usa el mismo patrón reutilizable que otros PanelAdmin (como productos, pedidos, etc.)
 */
export function PanelAdminUsuario() {
    const { sesion } = useSesion();
    const { usuarioService } = useUsuarioService();

    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [loading, setLoading] = useState(true);
    const [editUserId, setEditUserId] = useState<number | null>(null);

    // --- Cargar datos ---
    const fetchUsuarios = async () => {
        setLoading(true);
        try {
            const datos = await usuarioService.fetchAll();
            setUsuarios(datos);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsuarios();
    }, []);

    // --- Agregar usuario de prueba ---
    const handleAddUser = async () => {
        const randomName = "Usuario" + Math.floor(Math.random() * 1000);
        const usuario = new Usuario()
            .setNombreUsuario(randomName)
            .setEmail(randomName.toLowerCase() + "@mail.com")
            .setContraseña("123456");

        const resultado = await usuarioService.save(usuario);
        await fetchUsuarios();

        alert(resultado.message);
    };

    // --- Borrar usuario ---
    const handleDeleteUser = async (id: number) => {
        if (sesion.getIdUsuarioActivo() === id) {
            alert("No puedes borrar tu propia sesión 😉");
            return;
        }

        const confirmar = confirm("¿Estás seguro de que quieres borrar este usuario?");
        if (!confirmar) return;

        const resultado = await usuarioService.deleteById(id);
        await fetchUsuarios();

        alert(resultado.message);
    };

    // --- Cerrar modo edición ---
    const handleCloseEdit = async () => {
        setEditUserId(null);
        await fetchUsuarios();
    };

    // --- Renderizado ---
    if (loading) return <p>Cargando usuarios...</p>;

    return (
        <LoginSecurity>
            <AdminSecurity>
                <div className="contenedor-admin">
                    <h2>Gestión de Usuarios</h2>

                    <Boton onClick={handleAddUser}>Agregar Usuario</Boton>

                    <div className="admin-lista">
                        {usuarios.map((u: Usuario) => (
                            <div key={u.getId()} className="admin-item">
                                {editUserId === u.getId() ? (
                                    <EditUser usuario={u} onCloseEdit={handleCloseEdit} />
                                ) : (
                                    <DisplayUser usuario={u} />
                                )}

                                <div className="acciones">
                                    <Boton
                                        className="boton-admin-borrar"
                                        onClick={() => handleDeleteUser(u.getId())}
                                    >
                                        Borrar
                                    </Boton>

                                    <Boton
                                        className="boton-admin-editar"
                                        onClick={() =>
                                            setEditUserId(editUserId === u.getId() ? null : u.getId())
                                        }
                                    >
                                        {editUserId === u.getId() ? "Cancelar" : "Editar"}
                                    </Boton>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </AdminSecurity>
        </LoginSecurity>
    );
}
