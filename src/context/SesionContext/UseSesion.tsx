import { createContext, useContext } from "react";
import type { Sesion } from "../../model/Sesion";

interface SesionContextType 
{
  sesion: Sesion;
  sesionLogin: (id: number, token: string) => void;
  sesionLogout: () => void;
}

export const SesionContext = createContext<SesionContextType | undefined>(undefined);

export const useSesion = (): SesionContextType => 
{
  const context = useContext(SesionContext);
  if (!context)
    throw new Error("useSesion debe usarse dentro de un SesionProvider");
  
  return context;
};