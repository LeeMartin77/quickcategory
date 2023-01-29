import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

test("landing on a bad page", () => {
  const badRoute = "/some/bad/route";

  render(
    <MemoryRouter initialEntries={[badRoute]}>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByText(/Not Found/i)).toBeInTheDocument();
});
