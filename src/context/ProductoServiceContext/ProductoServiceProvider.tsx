import { useState, type ReactNode } from "react";
import { ProductoApiService } from "../../services/ProductoApiService";
import { ProductoServiceContext } from "./UseProductoService";
import { useSesion } from "../SesionContext/UseSesion";

interface ProductoServiceProviderProps
{
    children: ReactNode;
}

export function ProductoServiceProvider( {children}:ProductoServiceProviderProps )
{
    const { sesion } = useSesion();
    const [productoService] = useState(() => 
    {
        return new ProductoApiService(sesion.getToken() ?? undefined);
    });

    return(
        <ProductoServiceContext.Provider value={ {productoService} }>
            {children}
        </ProductoServiceContext.Provider>
    );
}