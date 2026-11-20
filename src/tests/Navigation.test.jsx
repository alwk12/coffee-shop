import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { CoffeeProvider } from "../context/CoffeeContext";
import App from "../App";

beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([]),
    }),
  );
});

function renderApp() {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <CoffeeProvider>
        <App />
      </CoffeeProvider>
    </MemoryRouter>,
  );
}

test("goes to the shop page", async () => {
  renderApp();

  await userEvent.click(screen.getByText("Shop"));

  expect(await screen.findByPlaceholderText("Search")).toBeInTheDocument();
});

test("goes to the admin page", async () => {
  renderApp();

  await userEvent.click(screen.getByText("Admin Portal"));

  expect(await screen.findByText("Add New Coffee")).toBeInTheDocument();
});
