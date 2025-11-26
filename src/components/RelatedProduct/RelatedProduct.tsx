import type { Producto } from "../../model/Producto"

import "../../assets/css/RelatedProduct/relatedproduct.css"
import { Link } from "react-router-dom";

interface RelatedProductProps
{
    producto: Producto;
}

export function RelatedProduct( {producto}: RelatedProductProps )
{
    return(
        <Link to={`/producto?nombre=${producto.getNombre()}`} className="producto-relacionado">
            <img
                src={producto.getImagen()}
                width={50}
                height={50} />
        </Link>
    );
}