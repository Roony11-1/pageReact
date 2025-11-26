import { AdminPanelProducto } from "./AdminPanelProducto";
import { AdminPanelUsuario } from "./AdminPanelUsuario";
import type { AdminPanel } from "../../model/AdminPanel";
import { AdminPanelHome } from "./AdminPanelHome";
import { AdminPanelVenta } from "./AdminPanelVenta";

export const adminPanels: AdminPanel[] = 
[
    {
        id: "inicio",
        nombre: "Inicio",
        componente: AdminPanelHome
    },
    {
        id: "usuarios",
        nombre: "Usuarios",
        componente: AdminPanelUsuario
    },
    {
        id: "productos",
        nombre: "Productos",
        componente: AdminPanelProducto
    },
    {
        id: "ventas",
        nombre: "Ventas",
        componente: AdminPanelVenta
    }
];
