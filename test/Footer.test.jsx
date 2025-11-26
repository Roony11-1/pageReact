import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';
import { describe, test, expect } from "vitest";
import { Footer } from "../src/components/Footer/Footer"; // ajusta ruta

describe("Footer", () => {


    test("muestra mensaje de suscripción al presionar Enter y limpia input después", async () => {
    render(
        <MemoryRouter>
        <Footer />
        </MemoryRouter>
    );

    const input = screen.getByPlaceholderText("email@example.com");

    
    await userEvent.type(input, "suscriptor@correo.com");

    
    await userEvent.keyboard("{Enter}");

    // El mensaje aparece
    expect(screen.getByText("¡Te has suscrito!")).toBeInTheDocument();

    
    await new Promise(r => setTimeout(r, 4000));

    
    expect(screen.queryByText("¡Te has suscrito!")).not.toBeInTheDocument();
    expect(input).toHaveValue("");
    });



    test(' Permite escribir en el campo de email', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );

    const input = screen.getByPlaceholderText('email@example.com');
    fireEvent.change(input, { target: { value: 'test@correo.com' } });

    expect(input).toHaveValue('test@correo.com');
  });


  test('Renderiza correctamente el contenido principal', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );

    expect(screen.getByText(/Level-Up Store © 2025/i)).toBeInTheDocument();
    expect(screen.getByText(/Nosotros/i)).toBeInTheDocument();
    expect(screen.getByText(/Contacto/i)).toBeInTheDocument();
  });

});