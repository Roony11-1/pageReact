import { expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { Login } from "../src/pages/Login";
import { useUsuarioService } from "../src/context/UsuarioServiceContext/UseUsuarioService";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { Usuario } from "../src/model/Usuario";

vi.mock("../src/context/UsuarioServiceContext/UseUsuarioService", () => ({
  useUsuarioService: vi.fn(),
}));

vi.mock("../src/context/SesionContext/UseSesion.tsx", () => ({
  useSesion: vi.fn(() => ({
    sesion: { getIdUsuarioActivo: () => null },
    sesionLogin: vi.fn(),
    cerrarSesion: vi.fn(),
  })),
}));

const renderConRouter = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>);

beforeAll(() => {
  vi.spyOn(window, "alert").mockImplementation(() => {});
});

describe("Renderización del componente Login", () => {
  beforeEach(() => {
    useUsuarioService.mockReturnValue({
      usuarioService: {
        login: vi.fn(),
      },
    });
  });

  test("Renderiza el formulario de inicio de sesión", () => {
    renderConRouter(<Login />);


    expect(screen.getByRole("heading", { name: /Iniciar Sesión/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Correo Electrónico/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Iniciar Sesión/i })).toBeInTheDocument();
  });
});

describe("Login exitoso", () => {
  beforeEach(() => {
    useUsuarioService.mockReturnValue({
      usuarioService: {
        login: vi.fn().mockResolvedValue({
          success: true,
          message: "Inicio de sesión exitoso",
          usuario: new Usuario().setId(1).setEmail("juan@ejemplo.com").setContraseña("123456"),
        }),
      },
    });
  });

  test("Muestra alerta de éxito", async () => {
    renderConRouter(<Login />);
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText(/Correo Electrónico/i), "juan@ejemplo.com");
    await user.type(screen.getByPlaceholderText(/Contraseña/i), "123456");
    await user.click(screen.getByRole("button", { name: /Iniciar Sesión/i }));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Inicio de sesión exitoso");
    });
  });
});

describe("Correo no encontrado", () => {
  beforeEach(() => {
    useUsuarioService.mockReturnValue({
      usuarioService: {
        login: vi.fn().mockResolvedValue({
          success: false,
          message: "Correo no encontrado",
        }),
      },
    });
  });

  test("Muestra alerta de correo no encontrado", async () => {
    renderConRouter(<Login />);
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText(/Correo Electrónico/i), "noexiste@correo.com");
    await user.type(screen.getByPlaceholderText(/Contraseña/i), "123456");
    await user.click(screen.getByRole("button", { name: /Iniciar Sesión/i }));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Correo no encontrado");
    });
  });
});

describe("Contraseña incorrecta", () => {
  beforeEach(() => {
    useUsuarioService.mockReturnValue({
      usuarioService: {
        login: vi.fn().mockResolvedValue({
          success: false,
          message: "Contraseña incorrecta",
        }),
      },
    });
  });

  test("Muestra alerta de contraseña incorrecta", async () => {
    renderConRouter(<Login />);
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText(/Correo Electrónico/i), "juan@ejemplo.com");
    await user.type(screen.getByPlaceholderText(/Contraseña/i), "wrongpass");
    await user.click(screen.getByRole("button", { name: /Iniciar Sesión/i }));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Contraseña incorrecta");
    });
  });
});

describe("Validaciones de formulario", () => {
  beforeEach(() => {
    useUsuarioService.mockReturnValue({
      usuarioService: {
        login: vi.fn(),
      },
    });
  });

  test("Muestra alerta con errores si ambos campos están vacíos", async () => {
    renderConRouter(<Login />);
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: /Iniciar Sesión/i }));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        expect.stringContaining("Errores:\nEl correo es obligatorio.\nEl correo electrónico no es válido.\nLa contraseña es obligatoria.")
      );
    });
  });

  test("Muestra alerta si el email es inválido", async () => {
    renderConRouter(<Login />);
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText(/Correo Electrónico/i), "correo_invalido");
    await user.type(screen.getByPlaceholderText(/Contraseña/i), "123456");
    await user.click(screen.getByRole("button", { name: /Iniciar Sesión/i }));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        expect.stringContaining("Errores:\nEl correo electrónico no es válido.")
      );
    });
  });

  test("Muestra alerta si falta la contraseña", async () => {
    renderConRouter(<Login />);
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText(/Correo Electrónico/i), "juan@ejemplo.com");
    await user.click(screen.getByRole("button", { name: /Iniciar Sesión/i }));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        expect.stringContaining("Errores:\nLa contraseña es obligatoria.")
      );
    });
  });
});



