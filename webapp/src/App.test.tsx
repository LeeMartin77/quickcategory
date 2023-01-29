import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("loads and displays greeting", async () => {
  // ARRANGE
  render(
    <MockedProvider>
      <App />
    </MockedProvider>
  );

  // ACT
  const button = screen.getByText("count is 0");
  await userEvent.click(button);
  await screen.findByRole("heading");

  // ASSERT
  expect(screen.getByRole("heading")).toHaveTextContent("Vite + React");
  expect(screen.getByText("count is 1")).toBeInTheDocument();
});
