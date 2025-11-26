import { type ReactNode } from "react";

import "../../assets/css/Boton/boton.css"

interface BotonProps
{
    children: ReactNode;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    type?: "submit" | "button";
}

export function Boton( {children, className="", onClick, type}:BotonProps )
{
    return(
        <button className={`btn ${className}`} onClick={onClick} type={type}>
            {children}
        </button>
    );
}