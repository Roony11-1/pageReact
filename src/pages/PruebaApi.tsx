import { useEffect, useState } from "react";
import { UsuarioApiService } from "../services/UsuarioApiService";
import { Usuario } from "../model/Usuario";

import { Producto } from "../model/Producto";
import { ProductoApiService } from "../services/ProductoApiService";

import { Blog } from "../model/Blog";
import { BlogApiService } from "../services/BlogApiService";

import { DisplayUser } from "../components/DisplayUser/DisplayUser";
import { DisplayProduct } from "../components/DisplayProduct/DisplayProduct";
import { DisplayBlog } from "../components/DisplayBlog/DisplayBlog";

export function PruebaApi() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([])

  // Form state
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    confirmarCorreo: "",
    contraseña: "",
    confirmarContraseña: "",
    telefono: "",
    region: "",
    comuna: "",
  });

  const [buscarId, setBuscarId] = useState(""); // input del usuario
  const [usuarioEncontrado, setUsuarioEncontrado] = useState<Usuario | null>(null); // resultado

  const usuarioService = new UsuarioApiService();
  const productoService = new ProductoApiService();
  const blogService = new BlogApiService();

const handleBuscarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setBuscarId(e.target.value);
};

const handleBuscarUsuario = async () => {
  const id = Number(buscarId);
  if (isNaN(id)) {
    alert("Ingresa un ID válido");
    return;
  }

  const usuario = await usuarioService.fetchById(id);
  setUsuarioEncontrado(usuario);

  if (!usuario) alert("Usuario no encontrado");
};

  // Manejo de cambios en inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

    // Manejo del submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Aquí podrías hacer validaciones simples
    if (formData.correo !== formData.confirmarCorreo) {
      alert("Los correos no coinciden");
      return;
    }

    if (formData.contraseña !== formData.confirmarContraseña) {
      alert("Las contraseñas no coinciden");
      return;
    }

    // Guardar en tu servicio
    // ⚠️ Esto depende de cómo definiste Usuario (si con setters o constructor)
    const nuevoUsuario = new Usuario()
      .setNombreUsuario(formData.nombre)
      .setEmail(formData.correo)
      .setContraseña(formData.contraseña)
      .setTelefono(formData.telefono || null)
      .setRegion(formData.region)
      .setComuna(formData.comuna || null);

    

    const ok = await usuarioService.save(nuevoUsuario);

    if (ok) {
      alert("Usuario registrado con éxito");
      setUsuarios((prev) => [...prev, nuevoUsuario]);
      setFormData({
        nombre: "",
        correo: "",
        confirmarCorreo: "",
        contraseña: "",
        confirmarContraseña: "",
        telefono: "",
        region: "",
        comuna: "",
      });
    }
  };

  const handleBorrarProducto = async (id: number) => {
  const confirmado = window.confirm("¿Seguro que quieres borrar este producto?");
  if (!confirmado) return;

  const ok = await productoService.deleteById(id);
  if (ok) 
  {
    alert("Producto eliminado correctamente");
    setProductos((prev) => prev.filter((p) => p.getId() !== id));
  } else {
    alert("No se pudo eliminar el producto");
  }
};

  const handleBorrarBlog = async (id: number) => {
  const confirmado = window.confirm("¿Seguro que quieres borrar este blog?");
  if (!confirmado) return;

  const ok = await blogService.deleteById(id);
  if (ok) 
  {
    alert("Blog eliminado correctamente");
    setBlogs((prev) => prev.filter((p) => p.getId() !== id));
  } else {
    alert("No se pudo eliminar el blog");
  }
};

  const handleBorrarUsuario = async (id: number) => {
  const confirmado = window.confirm("¿Seguro que quieres borrar este usuario?");
  if (!confirmado) return;

  const ok = await usuarioService.deleteById(id);
  if (ok) {
    alert("Usuario eliminado correctamente");
    setUsuarios((prev) => prev.filter(u => u.getId() !== id));
    if (usuarioEncontrado?.getId() === id) setUsuarioEncontrado(null);
  } else {
    alert("No se pudo eliminar el usuario");
  }
};

  useEffect(() => {
    const fetchUsuarios = async () => {
      const datos = await usuarioService.fetchAll();
      setUsuarios(datos);
    };

    const fetchBlogs = async () => {
      const datos = await blogService.fetchAll();
      setBlogs(datos);
    };

    const fetchProductos = async () => {
      const datos = await productoService.fetchAll();
      setProductos(datos);
    };

    fetchUsuarios();
    fetchProductos();
    fetchBlogs();
  }, []);

  return (
    <section style={{ padding: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div>
        <h2>Probaremos la consulta de datos a una API simulada desde LocalStorage</h2>
        <div style={{ flexWrap: "wrap", display: "flex", gap: "10px", marginBottom: "20px", flexDirection: "row" }}>
          {usuarios.map((u) => (
            <div key={u.getId()} style={{ display: "flex", alignItems: "center" }}>
              <DisplayUser usuario={u} />
            </div>
          ))}
        </div>

        <div>
          <h1>Registro</h1>
          <form onSubmit={handleSubmit} id="form-registro">
            <table>
              <tbody>
                <tr>
                  <td colSpan={2} style={{ textAlign: "center", fontSize: "18px", fontWeight: "bold" }}>
                    Registrarse
                  </td>
                </tr>
                <tr>
                  <td>Nombre Usuario:</td>
                  <td>
                    <input type="text" name="nombre" id="nombre" value={formData.nombre} onChange={handleChange} required />
                  </td>
                </tr>
                <tr>
                  <td>Correo:</td>
                  <td>
                    <input type="email" name="correo" id="correo" value={formData.correo} onChange={handleChange} required />
                  </td>
                </tr>
                <tr>
                  <td>Confirmar Correo:</td>
                  <td>
                    <input type="email" name="confirmarCorreo" id="confirmarCorreo" value={formData.confirmarCorreo} onChange={handleChange} required />
                  </td>
                </tr>
                <tr>
                  <td>Contraseña:</td>
                  <td>
                    <input type="password" name="contraseña" id="contraseña" value={formData.contraseña} onChange={handleChange} required />
                  </td>
                </tr>
                <tr>
                  <td>Confirmar Contraseña:</td>
                  <td>
                    <input type="password" name="confirmarContraseña" id="confirmarContraseña" value={formData.confirmarContraseña} onChange={handleChange} required />
                  </td>
                </tr>
                <tr>
                  <td>Teléfono (opcional):</td>
                  <td>
                    <input type="text" name="telefono" id="telefono" value={formData.telefono} onChange={handleChange} />
                  </td>
                </tr>
                <tr>
                  <td>Región (opcional):</td>
                  <td>
                    <input type="text" name="region" id="region" value={formData.region} onChange={handleChange} />
                  </td>
                </tr>
                <tr>
                  <td>Comuna (opcional):</td>
                  <td>
                    <input type="text" name="comuna" id="comuna" value={formData.comuna} onChange={handleChange} />
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} style={{ textAlign: "center" }}>
                    <input type="submit" value="Registrarse" />
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
        <div>
          <h1>Buscar Usuario por ID</h1>
          <input
            type="number"
            placeholder="ID del usuario"
            value={buscarId}
            onChange={handleBuscarChange}
          />
          <button type="button" onClick={handleBuscarUsuario}>Buscar</button>

          {usuarioEncontrado && (
            <div style={{ marginTop: "10px" }}>
              <h3>Usuario encontrado:</h3>
              <DisplayUser usuario={usuarioEncontrado} />
              <div>
                <h1>Borrar</h1>
                <button
                  style={{ marginLeft: "10px" }}
                  onClick={() => handleBorrarUsuario(usuarioEncontrado.getId())}>
                  Borrar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div>
        <div style={{ flexWrap: "wrap", display: "flex", gap: "10px", marginBottom: "20px" }}>
          {productos.map((p) => (
          <div key={p.getId()} style={{ display: "flex", alignItems: "center" }}>
            <DisplayProduct producto={p} />
            <button onClick={() => handleBorrarProducto(p.getId())}>Borrar</button>
          </div>
          ))}
        </div>
      </div>
      <div>
        <div style={{ flexWrap: "wrap", display: "flex", gap: "10px", marginBottom: "20px" }}>
          {blogs.map((p) => (
          <div key={p.getId()} style={{ display: "flex", alignItems: "center" }}>
            <DisplayBlog blog={p} />
            <button onClick={() => handleBorrarBlog(p.getId())}>Borrar</button>
          </div>
          ))}
        </div>
      </div>
    </section>
  );
}
