import { createContext } from "react";
import { UsuarioApiService } from "../../services/UsuarioApiService";
import { useTargetContext } from "../useTargetContext";

interface UsuarioServiceContextType
{
    usuarioService: UsuarioApiService;
}

export const UsuarioServiceContext = createContext<UsuarioServiceContextType | undefined>(undefined);
 
export const useUsuarioService = (): UsuarioServiceContextType =>
    useTargetContext(UsuarioServiceContext, "useUsuarioService debe usarse dentro de un UsuarioServiceProvider");