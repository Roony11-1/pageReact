import { createContext, useContext } from "react";
import type { ProductoApiService } from "../../services/ProductoApiService";

interface ProductoServiceType
{
    productoService: ProductoApiService;
}

export const ProductoServiceContext = createContext<ProductoServiceType | undefined>(undefined);

export const useProductoService = ():ProductoServiceType =>
{
    const context = useContext(ProductoServiceContext);

    if (!context)
        throw new Error("useProductoService debe usarse dentro de un ProductoServiceProvider")

    return context;
}