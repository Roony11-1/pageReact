import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Carrito } from "../src/pages/Carrito";
import { describe, it, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";

const mockCarrito = 
{
  getItems: vi.fn(),
  limpiarCarrito: vi.fn(),
  setItems: vi.fn(),
};

const mockSesion = 
{
  getIdUsuarioActivo: vi.fn(),
};

const mockProductoService = 
{
  fetchAll: vi.fn(),
};

const mockVentaApiServiceSave = vi.fn();

// Mock de alert y confirm
vi.stubGlobal("alert", vi.fn());
vi.stubGlobal("confirm", vi.fn(() => true));

// Mock de context providers
vi.mock("../src/context/CarritoContext/useCarrito", () => 
({
  useCarrito: () => (
  {
    carrito: mockCarrito,
    limpiarCarrito: mockCarrito.limpiarCarrito,
  })
}));

vi.mock("../src/context/SesionContext/UseSesion", () => (
{
  useSesion: () => ({ sesion: mockSesion })
}));

vi.mock("../src/context/ProductoServiceContext/UseProductoService", () => (
{
  useProductoService: () => ({ productoService: mockProductoService })
}));

vi.mock("../services/VentaApiService", () => (
{
  VentaApiService: vi.fn(() => ({ save: mockVentaApiServiceSave }))
}));

describe("Carrito component", () => 
{
  beforeEach(() => 
  {
    vi.clearAllMocks();
  });

  it("muestra mensaje de carrito vacío", async () => 
  {
    mockCarrito.getItems.mockReturnValue([]);
    render(
      <MemoryRouter>
        <Carrito />
      </MemoryRouter>
    );

    expect(await screen.findByText(/Carrito Vacío/i)).toBeInTheDocument();
    expect(screen.getByText(/Ir a el catálogo!/i)).toBeInTheDocument();
  });

  it("avisa si usuario no está logeado al pagar", async () => 
  {
    mockCarrito.getItems.mockReturnValue([{ productoId: 1, cantidad: 2 }]);
    mockProductoService.fetchAll.mockResolvedValue(
      [{
        getId: () => 1,
        getPrecio: () => 1000,
        getOferta: () => 0,
        isOferta: () => false
      }]);

    mockSesion.getIdUsuarioActivo.mockReturnValue(null);

    render(
      <MemoryRouter>
        <Carrito />
      </MemoryRouter>
    );

    const boton = await screen.findByText(/Ir a Pagar/i);
    fireEvent.click(boton);

    expect(alert).toHaveBeenCalledWith("Para proceder al pago debes estar logeado!");
  });
});
