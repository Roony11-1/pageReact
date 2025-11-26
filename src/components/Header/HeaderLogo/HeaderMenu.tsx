import { useState } from 'react';

import '../../../assets/css/Header/HeaderLogo/headermenu.css';  

export function HeaderMenu()
{
    const [menuOpen, setMenuOpen] = useState(false);

    return(     
        <div className="menuHeader" onClick={() => setMenuOpen(!menuOpen)}>
            <h2 className={menuOpen ? "titulo-abierto" : "titulo-cerrado"}>
                Menú
            </h2>
        </div>
    )
}