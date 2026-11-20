import { useState, useContext } from "react";
import { CoffeeContext } from "../context/CoffeeContext";

function AdminCoffeeRow({ coffee }) {
  const { updatePrice, deleteCoffee } = useContext(CoffeeContext);
  const [newPrice, setNewPrice] = useState(coffee.price);

  function handleUpdate() {
    if (newPrice === "" || Number(newPrice) < 0) {
      return;
    }
    updatePrice(coffee.id, Number(newPrice));
  }

  function handleDelete() {
    deleteCoffee(coffee.id);
  }

  return (
    <div className="admin-row">
      <span>
        {coffee.name} ({coffee.origin})
      </span>
      <input
        type="number"
        value={newPrice}
        onChange={(e) => setNewPrice(e.target.value)}
      />
      <button onClick={handleUpdate}>Update Price</button>
      <button onClick={handleDelete} className="delete-button">
        Delete
      </button>
    </div>
  );
}

export default AdminCoffeeRow;
