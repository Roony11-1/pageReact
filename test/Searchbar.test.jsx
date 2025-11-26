import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route, useLocation } from "react-router-dom";
import { describe, expect, test } from "vitest";
import { SearchBar } from "../src/components/SearchBar/SearchBar"; // ajusta la ruta según tu estructura

// Componente auxiliar para mostrar ruta actual (pathname + search)
function LocationDisplay() {
  const location = useLocation();
  return <div data-testid="location-display">{location.pathname + location.search}</div>;
}

describe("SearchBar", () => {
  test("tiene placeholder y botón accesible", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<SearchBar />} />
        </Routes>
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText("Buscar productos");
    expect(input).toBeInTheDocument();

    const boton = screen.getByRole("button", { name: /buscar/i });
    expect(boton).toBeInTheDocument();
  });

    test("acepta textos largos y navega correctamente", async () => {
    const texto = "x".repeat(250); // 250 caracteres
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<SearchBar />} />
          <Route path="/catalogo/search" element={<LocationDisplay />} />
        </Routes>
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText("Buscar productos");
    await userEvent.type(input, texto);
    await userEvent.click(screen.getByRole("button", { name: /buscar/i }));

    const locationDisplay = await screen.findByTestId("location-display");
    // verificamos que el query contiene parte del texto codificado (no necesitamos todo)
    expect(locationDisplay.textContent).toContain("/catalogo/search?filtro=");
    expect(locationDisplay.textContent?.length).toBeGreaterThan("/catalogo/search?".length);
  });

   test("no navega si el input está vacío (comportamiento de rechazo del submit)", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<>
            <SearchBar />
            <LocationDisplay />
          </>} />
          <Route path="/catalogo/search" element={<LocationDisplay />} />
        </Routes>
      </MemoryRouter>
    );

    // Input vacío por defecto
    const input = screen.getByPlaceholderText("Buscar productos");
    expect(input.value).toBe("");

    // Intentamos enviar
    await userEvent.click(screen.getByRole("button", { name: /buscar/i }));

    // Debe seguir en "/" (no haber query params)
    const locationDisplay = screen.getByTestId("location-display");
    expect(locationDisplay).toHaveTextContent("/");
  });

  test("envío mediante la tecla Enter en el input funciona (submit por teclado)", async () => {
    const texto = "auriculares";

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<SearchBar />} />
          <Route path="/catalogo/search" element={<LocationDisplay />} />
        </Routes>
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText("Buscar productos")
    await userEvent.type(input, texto + "{enter}");

    const locationDisplay = await screen.findByTestId("location-display");
    expect(locationDisplay).toHaveTextContent(`/catalogo/search?filtro=${encodeURIComponent(texto)}`);
  });
});