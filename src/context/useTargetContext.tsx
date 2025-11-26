import { useContext, type Context } from "react";

export function useTargetContext<T>(contextoProp: Context<T | undefined>, mensaje: string): T 
{
    const contexto = useContext(contextoProp);

    if (!contexto) 
        throw new Error(mensaje);
    
    return contexto;
}