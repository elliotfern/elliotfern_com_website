import { test } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // Importar MemoryRouter
import App from "../../../App";

test("Loads and displays title", async () => {
    render(
        <MemoryRouter>
          <App />
        </MemoryRouter>
      );
    
    await screen.getByRole("heading", { name: "Elliot Fernandez" });
});
