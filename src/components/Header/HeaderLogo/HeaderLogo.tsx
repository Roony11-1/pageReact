import { Link } from "react-router-dom";
import '../../../assets/css/Header/HeaderLogo/headerlogo.css';

import imagenFondo from '../../../assets/img/Header/Logo_level-Up-sin-fondo.png';

export function HeaderLogo()
{
  return(
    <div>
      <Link to="/">
        <img src={imagenFondo} alt="Logo Level Up" className='imgLogo'/>
      </Link>
    </div>
  )
}