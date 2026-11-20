import { render, screen } from "@testing-library/react";
import CoffeeCard from "../components/CoffeeCard";

test("shows the coffee details", () => {
  const coffee = {
    id: 1,
    name: "Vanilla Bean",
    description: "Medium roast",
    origin: "Colombia",
    price: 10,
  };

  render(<CoffeeCard coffee={coffee} />);

  expect(screen.getByText("Vanilla Bean")).toBeInTheDocument();
  expect(screen.getByText("Medium roast")).toBeInTheDocument();
  expect(screen.getByText("Colombia")).toBeInTheDocument();
  expect(screen.getByText("$10.00")).toBeInTheDocument();
});
