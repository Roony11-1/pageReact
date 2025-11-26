import type { ReactNode } from "react";
import { CarritoProvider } from "./context/CarritoContext/CarritoProvider";
import { ProductoServiceProvider } from "./context/ProductoServiceContext/ProductoServiceProvider";
import { SesionProvider } from "./context/SesionContext/SesionProvider";
import { UsuarioServiceProvider } from "./context/UsuarioServiceContext/UsuarioServiceProvider";

export const AppProviders = ({ children }: { children: ReactNode }) => (
    <SesionProvider>
        <ProductoServiceProvider>
            <UsuarioServiceProvider>
                <CarritoProvider>
                    {children}
                </CarritoProvider>
            </UsuarioServiceProvider>
        </ProductoServiceProvider>
    </SesionProvider>
);