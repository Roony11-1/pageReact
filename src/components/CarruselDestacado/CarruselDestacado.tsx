import { Carousel } from "react-bootstrap";

import "../../assets/css/CarruselProductoDestacado/carruseldestacado.css"

import { Producto } from "../../model/Producto";
import { Blog } from "../../model/Blog";
import { DisplayMarkedProduct } from "../Home/DisplayMarkedProduct/DisplayMarkedProduct";
import { DisplayMarkedBlogs } from "../Home/DisplayMarkedBlog/DisplayMarkedBlog";

interface CarruselDestacadoProps 
{
    item?: (Producto | Blog)[];
    interval?: number;
}

export function CarruselDestacado({ item = [], interval = 1500 }: CarruselDestacadoProps) {
    if (item.length === 0)
        return <p>No hay productos destacados disponibles.</p>;

    return (
        <Carousel
            className="carrusel-producto-destacado"
            controls={false}
            indicators={false}
            interval={interval}
        >
            {item.map((item, index) => (
                <Carousel.Item key={index}>
                    {item instanceof Producto ? (
                        <DisplayMarkedProduct producto={item} />
                    ) : item instanceof Blog ? (
                        <DisplayMarkedBlogs blog={item} />
                    ) : null}
                </Carousel.Item>
            ))}
        </Carousel>
    );
}
