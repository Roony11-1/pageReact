import { Link } from "react-router-dom";
import type { Producto } from "../../../model/Producto";

import "../../../assets/css/Home/DisplayMarked/product.css"

export function DisplayMarkedProduct({ producto }: { producto: Producto })
{
    return(
        <Link to={`/producto?nombre=${producto.getNombre()}`} className="producto-destacado">
            <img src={producto.getImagen()} alt={producto.getNombre()}/>
        </Link>
    );
}