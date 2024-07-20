import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Pokemon3 from "@/components/Atoms/Pokemon3";

interface MockResponse {
  name: string;
  sprites: {
    front_default: string;
  };
}

beforeEach(() => {
  // Mockear la respuesta de la API
  (global.fetch as jest.Mock) = jest.fn(
    () =>
      Promise.resolve({
        json: () =>
          Promise.resolve<MockResponse>({
            name: "Pikachu",
            sprites: {
              front_default: "https://example.com/pikachu.png",
            },
          }),
      }) as Promise<Response>
  );
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('muestra "Loading..." mientras se carga el Pokémon', () => {
  render(<Pokemon3 id={1} />);

  // Verificar que el texto "Loading..." está presente
  expect(screen.getByText("Loading...")).toBeInTheDocument();
});

test("muestra el nombre y la imagen del Pokémon después de la carga", async () => {
  render(<Pokemon3 id={1} />);

  // Esperar a que el componente se actualice después de la carga
  await waitFor(() => {
    // Verificar que el nombre del Pokémon se muestra en el documento
    expect(screen.getByText("Pikachu")).toBeInTheDocument();
    // Verificar que la imagen del Pokémon se muestra en el documento
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      "https://example.com/pikachu.png"
    );
  });
});
