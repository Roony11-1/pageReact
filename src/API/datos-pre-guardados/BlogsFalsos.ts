import { Blog } from "../../model/Blog";

export function BlogsFalsos() 
{
    return [
        new Blog()
                    .setId(1)
                    .setDescripcion(" El 28 de septiembre se llevará a cabo el PC Gaming Show Tokyo Direct, presentando trailers exclusivos, entrevistas con desarrolladores y más novedades jugosas para fans de los juegos de PC.")
                    .setImagen("/TGS25-PC-Gamer.png")
                    .setUrl("https://lado.mx/noticia/19110584")
                    .setTituloAutomatico(),

                new Blog()
                    .setId(2)
                    .setDescripcion(" El lanzamiento del esperado Hollow Knight: Silksong el 4 de septiembre hizo que plataformas como Steam y Nintendo eShop colapsaran por la alta demanda en varias regiones.")
                    .setImagen("/caidaxhollow knigth.png")
                    .setUrl("https://es-us.noticias.yahoo.com/hollow-knight-silksong-provoca-ca%C3%ADda-153627740.html?guccounter=1&guce_referrer=aHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS8&guce_referrer_sig=AQAAAFkVmqdOS6tH48U5wjpbLjgb7VeojwYBKqdWmYGj1yxAidJy_f1ls_umxoDKvEIlOG18cVVMq7YAjahsHYrbRJTt3psR7L-0lWIYWMgrdaCtkqn7AlwtnhQZ5MXlX372eH5z49HDZxR3PyKUJu1-C2qa5ioldhyqGCGEgwkhTkZC")
                    .setTituloAutomatico(),

                new Blog()
                    .setId(3)
                    .setDescripcion("Sony anunció que desde el 16 de septiembre de 2025, los usuarios con plan Extra o Premium de PlayStation Plus podrán jugar WWE 2K25 y Legacy of Kain: Defiance, junto a otros títulos clásicos.")
                    .setImagen("/juegosPlus.png")
                    .setUrl("https://www.myepicnet.com/noticias/sony-ha-anunciado-los-juegos-que-llegaran-al-catalogo-de-juegos-de-ps-plus-este-mes/")
                    .setTituloAutomatico()

    ];
}