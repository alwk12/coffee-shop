import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { CoffeeProvider } from "../context/CoffeeContext";
import AdminPortal from "../pages/AdminPortal";

beforeEach(() => {
  global.fetch = vi.fn((url, options) => {
    if (options && options.method === "POST") {
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            id: 5,
            name: "Test Coffee",
            description: "Tasty",
            origin: "Kenya",
            price: 9,
          }),
      });
    }
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve([]),
    });
  });
});

function renderAdmin() {
  render(
    <MemoryRouter>
      <CoffeeProvider>
        <AdminPortal />
      </CoffeeProvider>
    </MemoryRouter>,
  );
}

test("shows an error when the form is empty", async () => {
  renderAdmin();

  await userEvent.click(screen.getByText("Submit"));

  expect(screen.getByText("Please fill in all fields")).toBeInTheDocument();
});

test("adds a new coffee when the form is filled", async () => {
  renderAdmin();

  await userEvent.type(screen.getByLabelText("Coffee Name"), "Test Coffee");
  await userEvent.type(screen.getByLabelText("Description"), "Tasty");
  await userEvent.type(screen.getByLabelText("Origin"), "Kenya");
  await userEvent.type(screen.getByLabelText("Price"), "9");
  await userEvent.click(screen.getByText("Submit"));

  expect(await screen.findByText("Test Coffee (Kenya)")).toBeInTheDocument();
});
