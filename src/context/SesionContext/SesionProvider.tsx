import { useState, type ReactNode } from "react";
import { SesionContext } from "./UseSesion";
import { Sesion } from "../../model/Sesion";

export function SesionProvider({ children }: { children: ReactNode }) 
{
    const [sesion, setSesion] = useState(() => 
    {
        const datosGuardados = localStorage.getItem("sesion");
        const sesionInicial = new Sesion();

        if (datosGuardados) 
        {
            try 
            {
                const datos = JSON.parse(datosGuardados);

                if (datos.idUsuarioActivo && datos.token) 
                    sesionInicial
                        .setIdUsuarioActivo(datos.idUsuarioActivo)
                        .setToken(datos.token);
            } 
            catch 
            {
                localStorage.removeItem("sesion");
            }
        }

        return sesionInicial;
    });

    const sesionLogin = (id: number, token: string) => 
    {
        const nuevaSesion = new Sesion();
        nuevaSesion.setIdUsuarioActivo(id).setToken(token);
        localStorage.setItem("sesion", JSON.stringify(nuevaSesion));
        setSesion(nuevaSesion);
    };

    const sesionLogout = () => 
    {
        localStorage.removeItem("sesion");
        setSesion(new Sesion());
    };

    return (
        <SesionContext.Provider value={{ sesion, sesionLogin, sesionLogout }}>
            {children}
        </SesionContext.Provider>
    );
}
