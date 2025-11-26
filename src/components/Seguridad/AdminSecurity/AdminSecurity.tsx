import { useEffect, useState, type ReactNode } from "react";
import { useSesion } from "../../../context/SesionContext/UseSesion";
import { NotFound } from "../../../pages/NotFound";
import { useUsuarioService } from "../../../context/UsuarioServiceContext/UseUsuarioService";

interface AdminSecurityProps 
{
    children: ReactNode;
}

export function AdminSecurity({ children }: AdminSecurityProps)
{
    const { sesion } = useSesion();

    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    const { usuarioService } = useUsuarioService();

    useEffect(() => 
    {
        const fetchUsuario = async () => 
        {
            const idUsuarioActivo = sesion.getIdUsuarioActivo();

            if (idUsuarioActivo) 
            {
                const datos = await usuarioService.fetchById(idUsuarioActivo);
                setIsAdmin(datos?.isAdmin() || false);
            } 
            else 
                setIsAdmin(false);

            setLoading(false);
        };

        fetchUsuario();
    }, [sesion]);

    if (loading) return <p>Cargando Sesión...</p>;

    if (!isAdmin) 
        return <NotFound />

    return <>{children}</>;
}