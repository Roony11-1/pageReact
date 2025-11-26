import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi, beforeEach } from "vitest";
import { Registro } from "../src/pages/Registro";
import { useUsuarioService } from "../src/context/UsuarioServiceContext/UseUsuarioService";
import { UbicacionService } from "../src/utilities/RegionComuna";
import { MemoryRouter } from "react-router-dom";

// Mock del contexto y servicios
//para simular el comportamiento de  las partes externas del sistema que no se pueden ejecutar tealmente durante los tests
vi.mock("../src/context/UsuarioServiceContext/UseUsuarioService", () => ({
  useUsuarioService: vi.fn(),
}));
vi.mock("../src/components/Seguridad/LoginSecurity/LoginSecurity", () => ({
  LoginSecurity: ({ children }) => <>{children}</>,
}));
vi.mock("../src/context/SesionContext/UseSesion.tsx", () => ({
  useSesion: vi.fn(() => ({
    sesion: { getIdUsuarioActivo: () => null },
    setSesion: vi.fn(),
    cerrarSesion: vi.fn(),
  })),
}));
vi.mock("../src/utilities/RegionComuna", () => ({
  UbicacionService: {
    getRegiones: vi.fn(() => ["Region 1", "Region 2"]),
    getComunas: vi.fn((region) =>
      region === "Region 1" ? ["Comuna A", "Comuna B"] : ["Comuna C"]
    ),
  },
}));

beforeEach(() => {
  useUsuarioService.mockReturnValue({
    usuarioService: {
      save: vi.fn().mockResolvedValue({
        success: true,
        message: "Usuario registrado correctamente",
      }),
    },
  });
  vi.spyOn(window, "alert").mockImplementation(() => {});
});

const renderConRouter = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>);

describe("Tests del formulario de Registro", () => {
  //Verifica que el componente cargue bien//
  test("Renderiza el título correctamente", () => {
    renderConRouter(<Registro />);
    const titulo = screen.getByRole("heading", { name: /página de registro/i });
    expect(titulo).toBeInTheDocument();
  });
   //Verifica carga inicial de selects//
  test("Carga regiones al renderizar", async () => {
    renderConRouter(<Registro />);
    await waitFor(() => {
      expect(UbicacionService.getRegiones).toHaveBeenCalled();
    });

  
    const selectRegion = screen.getAllByRole("combobox")[0];
    expect(selectRegion).toBeInTheDocument();
    expect(selectRegion.innerHTML).toContain("Region 1");
  });
  //Flujo completo con éxito del llenado del formulario de registro//
 test("Simula ingreso de datos y envío exitoso", async () => {
  renderConRouter(<Registro />);
  const user = userEvent.setup();

  
  const inputNombre = screen.getByPlaceholderText(/nombre de usuario/i);
  const inputEmail = screen.getByPlaceholderText(/^correo$/i);
  const inputConfirmarEmail = screen.getByPlaceholderText(/confirmar correo/i);
  const inputPass = screen.getByPlaceholderText(/^contraseña$/i);
  const inputConfirmarPass = screen.getByPlaceholderText(/confirmar contraseña/i);
  const inputTelefono = screen.getByPlaceholderText(/9x{8}/i);

  const selectRegion = screen.getAllByRole("combobox")[0];
  const selectComuna = screen.getAllByRole("combobox")[1];
  const boton = screen.getByRole("button", { name: /registrarse/i });

  // Simular ingreso de datos
  await user.type(inputNombre, "Juanito");
  await user.type(inputEmail, "juan@test.com");
  await user.type(inputConfirmarEmail, "juan@test.com");
  await user.type(inputPass, "abcdef");
  await user.type(inputConfirmarPass, "abcdef");
  await user.type(inputTelefono, "912345678");

  // Verificar que los valores fueron escritos correctamente
  expect(inputNombre).toHaveValue("Juanito");
  expect(inputEmail).toHaveValue("juan@test.com");
  expect(inputConfirmarEmail).toHaveValue("juan@test.com");
  expect(inputPass).toHaveValue("abcdef");
  expect(inputConfirmarPass).toHaveValue("abcdef");
  expect(inputTelefono).toHaveValue("912345678");

  // Seleccionar región y comuna
  await user.selectOptions(selectRegion, "Region 1");
  await waitFor(() => {
    expect(UbicacionService.getComunas).toHaveBeenCalledWith("Region 1");
  });
  await user.selectOptions(selectComuna, "Comuna A");

  // Enviar formulario
  await user.click(boton);

  // Confirmar mensaje de éxito
  await waitFor(() => {
    expect(window.alert).toHaveBeenCalledWith("Usuario registrado correctamente");
  });
}, 10000);

  test("Muestra errores si faltan campos obligatorios", async () => {
    renderConRouter(<Registro />);
    const usuario = userEvent.setup();

    const boton = screen.getByRole("button", { name: /registrarse/i });
    await usuario.click(boton);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalled();
      const msg = window.alert.mock.calls[0][0];
      expect(msg).toContain("El nombre de usuario es obligatorio");
      expect(msg).toContain("Debes seleccionar una región");
    });
  });
// Comprueba que el sistema detecta correos mal escritos y que el alert lo notifica correctamente/
test("Muestra error si el correo no es válido", async () => {
  renderConRouter(<Registro />);
  const user = userEvent.setup();

  const inputEmail = screen.getByPlaceholderText(/^correo$/i);
  const inputConfirmarEmail = screen.getByPlaceholderText(/confirmar correo/i);
  const boton = screen.getByRole("button", { name: /registrarse/i });

  await user.type(inputEmail, "correo-invalido");
  await user.type(inputConfirmarEmail, "correo-invalido");
  await user.click(boton);

  await waitFor(() => {
    expect(window.alert).toHaveBeenCalled();
    const msg = window.alert.mock.calls[0][0];
    expect(msg).toContain("El correo electrónico no es válido");
  });
});
  //Asegura que se muestra el error cuando las contraseñas no coinciden/
test("Muestra error si las contraseñas no coinciden", async () => {
  renderConRouter(<Registro />);
  const user = userEvent.setup();

  const inputPass = screen.getByPlaceholderText(/^contraseña$/i);
  const inputConfirmarPass = screen.getByPlaceholderText(/confirmar contraseña/i);
  const boton = screen.getByRole("button", { name: /registrarse/i });

  await user.type(inputPass, "123456");
  await user.type(inputConfirmarPass, "abcdef");
  await user.click(boton);

  await waitFor(() => {
    const msg = window.alert.mock.calls[0][0];
    expect(msg).toContain("Las contraseñas no coinciden");
  });
});
 //Verifica que no se acepten teléfonos con menos de 9 dígitos//
test("Muestra error si el teléfono no tiene 9 dígitos", async () => {
  renderConRouter(<Registro />);
  const user = userEvent.setup();

  const inputTelefono = screen.getByPlaceholderText(/9x{8}/i);
  const boton = screen.getByRole("button", { name: /registrarse/i });

  await user.type(inputTelefono, "12345");
  await user.click(boton);

  await waitFor(() => {
    const msg = window.alert.mock.calls[0][0];
    expect(msg).toContain("El teléfono debe tener 9 dígitos");
  });
});
 //Asegura que el formulario se reinicia cuando el registro fue exitoso//
test("Limpia el formulario después de registro exitoso", async () => {
  renderConRouter(<Registro />);
  const user = userEvent.setup();

  const inputNombre = screen.getByPlaceholderText(/nombre de usuario/i);
  const inputEmail = screen.getByPlaceholderText(/^correo$/i);
  const inputConfirmarEmail = screen.getByPlaceholderText(/confirmar correo/i);
  const inputPass = screen.getByPlaceholderText(/^contraseña$/i);
  const inputConfirmarPass = screen.getByPlaceholderText(/confirmar contraseña/i);
  const boton = screen.getByRole("button", { name: /registrarse/i });

  
  const selectRegion = screen.getAllByRole("combobox")[0];
  const selectComuna = screen.getAllByRole("combobox")[1];

  await user.type(inputNombre, "Ricardo");
  await user.type(inputEmail, "ricardo@test.com");
  await user.type(inputConfirmarEmail, "ricardo@test.com");
  await user.type(inputPass, "abcdef");
  await user.type(inputConfirmarPass, "abcdef");

  await user.selectOptions(selectRegion, "Region 1");
  await waitFor(() => {
    expect(UbicacionService.getComunas).toHaveBeenCalledWith("Region 1");
  });
  await user.selectOptions(selectComuna, "Comuna A");

  await user.click(boton);

  await waitFor(() => {
    expect(window.alert).toHaveBeenCalledWith("Usuario registrado correctamente");
    expect(inputNombre).toHaveValue("");
    expect(inputEmail).toHaveValue("");
  });
});
 //Verifica que el servicio usuarioService.save() fue llamado con una instancia válida de Usuario//
test("Llama a usuarioService.save con los datos correctos", async () => {
  const saveMock = vi.fn().mockResolvedValue({
    success: true,
    message: "Usuario registrado correctamente",
  });
  useUsuarioService.mockReturnValue({ usuarioService: { save: saveMock } });

  renderConRouter(<Registro />);
  const user = userEvent.setup();

  await user.type(screen.getByPlaceholderText(/nombre de usuario/i), "Neytan");
  await user.type(screen.getByPlaceholderText(/^correo$/i), "neytan@test.com");
  await user.type(screen.getByPlaceholderText(/confirmar correo/i), "neytan@test.com");
  await user.type(screen.getByPlaceholderText(/^contraseña$/i), "abcdef");
  await user.type(screen.getByPlaceholderText(/confirmar contraseña/i), "abcdef");
  await user.selectOptions(screen.getAllByRole("combobox")[0], "Region 1");
  await user.selectOptions(screen.getAllByRole("combobox")[1], "Comuna A");

  await user.click(screen.getByRole("button", { name: /registrarse/i }));

  await waitFor(() => {
    expect(saveMock).toHaveBeenCalledTimes(1);
    const usuarioLlamado = saveMock.mock.calls[0][0];
    expect(usuarioLlamado.nombreUsuario).toBe("Neytan");
    expect(usuarioLlamado.email).toBe("neytan@test.com");
  });
});
//Asegura que al cambiar la región, las comunas se actualizan correctamente//
test("Carga comunas correctas al cambiar la región", async () => {
  renderConRouter(<Registro />);
  const user = userEvent.setup();

  const selectRegion = screen.getAllByRole("combobox")[0];
  const selectComuna = screen.getAllByRole("combobox")[1];

  await user.selectOptions(selectRegion, "Region 1");
  await waitFor(() => {
    expect(UbicacionService.getComunas).toHaveBeenCalledWith("Region 1");
    expect(selectComuna.innerHTML).toContain("Comuna A");
  });
});
});




