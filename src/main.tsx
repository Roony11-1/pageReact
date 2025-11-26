import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout/Layout.tsx";
import App from "./App.tsx";
import { AppProviders } from "./AppProviders.tsx";
import "./assets/css/index.css";

// Paginas principales
import { Home } from "./pages/home";
import { NotFound } from "./pages/NotFound";
import { PruebaApi } from "./pages/PruebaApi";
import { Productos } from "./pages/Productos";
import { Login } from "./pages/Login";
import { Nosotros } from "./pages/Nosotros";
import { Registro } from "./pages/Registro";
import { Blogs } from "./pages/Blogs";
import { Contacto } from "./pages/Contacto";
import { SingingCat } from "./pages/SingingCat";
import { PanelUsuario } from "./pages/PanelUsuario.tsx";
import { ProductoPagina } from "./pages/ProductoPagina.tsx";
import { Carrito } from "./pages/Carrito.tsx";
import { PanelAdmin } from "./pages/PanelAdmin.tsx";



createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProviders>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="app" element={<App />} />
          <Route path="catalogo" element={<Productos />} />
          <Route path="catalogo/search" element={<Productos />} />
          <Route path="producto" element={<ProductoPagina />} />
          <Route path="carrito" element={<Carrito />} />
          <Route path="testapi" element={<PruebaApi />} />
          <Route path="login" element={<Login />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="registrarse" element={<Registro />} />
          <Route path="*" element={<NotFound />} />
          <Route path="nosotros" element={<Nosotros />} />
          <Route path='/contactos' element={<Contacto/>}/>
          <Route path="gato" element={<SingingCat />} />
          <Route path="panel-usuario" element={<PanelUsuario />} />
          <Route path="admin" element={<PanelAdmin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProviders>
  </StrictMode>
);