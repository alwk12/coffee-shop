import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { CoffeeProvider } from "../context/CoffeeContext";
import Shop from "../pages/Shop";

const fakeCoffees = [
  {
    id: 1,
    name: "Vanilla Bean",
    description: "Medium",
    origin: "Colombia",
    price: 10,
  },
  {
    id: 2,
    name: "House Blend",
    description: "Dark",
    origin: "Vietnam",
    price: 12,
  },
];

beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(fakeCoffees),
    }),
  );
});

function renderShop() {
  render(
    <MemoryRouter>
      <CoffeeProvider>
        <Shop />
      </CoffeeProvider>
    </MemoryRouter>,
  );
}

test("shows coffees from the server", async () => {
  renderShop();

  expect(await screen.findByText("Vanilla Bean")).toBeInTheDocument();
  expect(screen.getByText("House Blend")).toBeInTheDocument();
});

test("search filters the coffees", async () => {
  renderShop();

  await screen.findByText("Vanilla Bean");
  await userEvent.type(screen.getByPlaceholderText("Search"), "house");

  expect(screen.queryByText("Vanilla Bean")).not.toBeInTheDocument();
  expect(screen.getByText("House Blend")).toBeInTheDocument();
});

test("origin checkbox filters the coffees", async () => {
  renderShop();

  await screen.findByText("Vanilla Bean");
  await userEvent.click(screen.getByLabelText("Vietnam"));

  expect(screen.queryByText("Vanilla Bean")).not.toBeInTheDocument();
  expect(screen.getByText("House Blend")).toBeInTheDocument();
});
