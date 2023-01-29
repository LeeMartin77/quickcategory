import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import userEvent from "@testing-library/user-event";
import App, { TEST_QUERY } from "./App";

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

test("loads and displays gql response", async () => {
  // ARRANGE
  const mocks = [
    {
      request: {
        query: TEST_QUERY,

        variables: {},
      },

      result: {
        data: {
          test: { hello: "test-world" },
        },
      },
    },
  ];

  render(
    <MockedProvider mocks={mocks}>
      <App />
    </MockedProvider>
  );

  // ACT

  // ASSERT
  expect(await screen.findByText("test-world")).toBeInTheDocument();
});
