import { Link } from "react-router-dom";
import "../../assets/css/DisplayProduct/displayproduct.css"

import { Producto } from "../../model/Producto";


export function DisplayProduct({ producto }: { producto: Producto }) 
{
    const enOferta = producto.isOferta();
    const oferta = (producto.getOferta());
    return (
        <div className="producto">
            {enOferta && <strong>Oferta: {oferta*100}%</strong>}
            <Link to={`/producto?nombre=${producto.getNombre()}`}><img src={producto.getImagen()} alt={producto.getNombre()}/></Link>
            <Link to={`/producto?nombre=${producto.getNombre()}`}><h1>{producto.getNombre()}</h1></Link>
            {producto.getCantidad() > 0 
                ? <h1></h1> 
                : <h2 className="producto-agotado">Agotado</h2>
            }
            <div>
                {enOferta ? (
                    <div>
                        <span
                            style={{
                            textDecoration: "line-through",
                            marginLeft: "5px",
                            color: "#888"}}>
                                [${producto.precio.toLocaleString("es-CL")}]
                        </span>
                        <strong>${(producto.precio*(1-oferta)).toLocaleString("es-CL")}</strong>
                    </div>
                ) : (
                    <span>
                        ${producto.precio.toLocaleString("es-CL")}
                    </span>
                )}
            </div>
        </div>
    );
}
