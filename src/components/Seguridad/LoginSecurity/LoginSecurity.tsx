import { type ReactNode } from "react";
import { useSesion } from "../../../context/SesionContext/UseSesion";
import { Navigate } from "react-router-dom";

interface LoginSecurityProps 
{
    children: ReactNode;
    invitado?: boolean;
}

export function LoginSecurity({ children, invitado = false }: LoginSecurityProps) 
{
    const { sesion } = useSesion();

    const idUsuarioActivo = sesion.getIdUsuarioActivo();

    if (!idUsuarioActivo && !invitado)
        return <Navigate to="/login" replace />;

    if (idUsuarioActivo && invitado)
        return <Navigate to="/" replace />;

    return <>{children}</>;
}