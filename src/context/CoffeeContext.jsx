import { createContext } from "react";
import useFetch from "../hooks/useFetch";

const CoffeeContext = createContext();

const API_URL = "http://localhost:3000/coffee";

function CoffeeProvider({ children }) {
  const {
    data: coffees,
    setData: setCoffees,
    loading,
    error,
  } = useFetch(API_URL);

  function addCoffee(newCoffee) {
    return fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCoffee),
    })
      .then((response) => response.json())
      .then((savedCoffee) => {
        setCoffees([...coffees, savedCoffee]);
      });
  }

  function updatePrice(id, newPrice) {
    return fetch(API_URL + "/" + id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price: newPrice }),
    })
      .then((response) => response.json())
      .then((updatedCoffee) => {
        const newList = coffees.map((coffee) => {
          if (coffee.id === id) {
            return updatedCoffee;
          }
          return coffee;
        });
        setCoffees(newList);
      });
  }

  function deleteCoffee(id) {
    return fetch(API_URL + "/" + id, {
      method: "DELETE",
    }).then(() => {
      const newList = coffees.filter((coffee) => coffee.id !== id);
      setCoffees(newList);
    });
  }

  const value = {
    coffees,
    loading,
    error,
    addCoffee,
    updatePrice,
    deleteCoffee,
  };

  return (
    <CoffeeContext.Provider value={value}>{children}</CoffeeContext.Provider>
  );
}

export { CoffeeContext, CoffeeProvider };
