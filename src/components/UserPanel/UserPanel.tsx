import { NavLink } from 'react-router-dom';
import '../../assets/css/UserPanel/userpanel.css';

export function UserPanel() 
{
  return(
    <div className="user-panel">
      <h1>Menú</h1>
      <div className="user-links">
        <div>
          <NavLink to="/" className={({ isActive }) => isActive ? "seleccionada" : ""}><h2>Inicio</h2></NavLink>
          <NavLink to="/catalogo" className={({ isActive }) => isActive ? "seleccionada" : ""}><h2>Catálogo</h2></NavLink>
          <NavLink to="/blogs" className={({ isActive }) => isActive ? "seleccionada" : ""}><h2>Blogs</h2></NavLink>
          <NavLink to="/carrito" className={({ isActive }) => isActive ? "seleccionada" : ""}><h2>Carrito</h2></NavLink>
        </div>
        <NavLink to="/app" className={({ isActive }) => isActive ? "seleccionada" : ""}><h2>App</h2></NavLink>
        <NavLink to="/testapi" className={({ isActive }) => isActive ? "seleccionada" : ""}><h2>Test</h2></NavLink>
        <NavLink to="/gato" className={({ isActive }) => isActive ? "seleccionada" : ""}><h2>Gato</h2></NavLink>
      </div>
    </div>
  )
}