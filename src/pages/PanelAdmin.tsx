import { useState } from "react";
import { adminPanels } from "../components/admin/AdminPanel"
import "../assets/css/PanelAdmin/paneladmin.css";
import { LoginSecurity } from "../components/Seguridad/LoginSecurity/LoginSecurity";
import { AdminSecurity } from "../components/Seguridad/AdminSecurity/AdminSecurity";
import { Boton } from "../components/Boton/Boton";

export function PanelAdmin() 
{
    const [panelActivo, setPanelActivo] = useState(adminPanels[0].id);

    const panelSeleccionado = adminPanels.find(p => p.id === panelActivo);

    return (
        <LoginSecurity>
            <AdminSecurity>
                <div className="panel-admin-general">
                    <div className="menu-lateral">
                        <h2>Panel de Administración</h2>
                        {adminPanels.map((panel) => (
                            <Boton
                                key={panel.id}
                                className={`boton-menu ${panelActivo === panel.id ? "activo" : ""}`}
                                onClick={() => setPanelActivo(panel.id)}>
                                    {panel.nombre}
                            </Boton>
                        ))}
                    </div>

                    <main className="contenido-panel">
                        {panelSeleccionado ? (
                            <panelSeleccionado.componente />
                        ) : (
                            <p>Selecciona un panel</p>
                        )}
                    </main>
                </div>
            </AdminSecurity>
        </LoginSecurity>
    );
}
