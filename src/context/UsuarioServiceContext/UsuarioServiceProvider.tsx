import { useState, type ReactNode } from "react";
import { UsuarioApiService } from "../../services/UsuarioApiService";
import { UsuarioServiceContext } from "./UseUsuarioService";
import { useSesion } from "../SesionContext/UseSesion";

export function UsuarioServiceProvider({ children }: { children: ReactNode }) 
{
    const { sesion } = useSesion();
    const [usuarioService] = useState(() => 
    {
        return new UsuarioApiService(sesion.getToken() ?? undefined);
    });

    return(
        <UsuarioServiceContext.Provider value={{usuarioService}}>
            {children}
        </UsuarioServiceContext.Provider>
    );
}