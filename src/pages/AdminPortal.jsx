import { useState, useContext, useRef, useId } from "react";
import { CoffeeContext } from "../context/CoffeeContext";
import AdminCoffeeRow from "../components/AdminCoffeeRow";

function AdminPortal() {
  const { coffees, addCoffee } = useContext(CoffeeContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [origin, setOrigin] = useState("");
  const [price, setPrice] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const nameInput = useRef(null);
  const id = useId();

  function handleSubmit(e) {
    e.preventDefault();

    if (name === "" || description === "" || origin === "" || price === "") {
      setErrorMessage("Please fill in all fields");
      return;
    }

    const newCoffee = {
      name: name,
      description: description,
      origin: origin,
      price: Number(price),
    };

    addCoffee(newCoffee).then(() => {
      setName("");
      setDescription("");
      setOrigin("");
      setPrice("");
      setErrorMessage("");
      nameInput.current.focus();
    });
  }

  return (
    <div className="admin">
      <form className="admin-form" onSubmit={handleSubmit}>
        <h2>Add New Coffee</h2>

        <label htmlFor={id + "-name"}>Coffee Name</label>
        <input
          id={id + "-name"}
          ref={nameInput}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor={id + "-description"}>Description</label>
        <input
          id={id + "-description"}
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label htmlFor={id + "-origin"}>Origin</label>
        <input
          id={id + "-origin"}
          type="text"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
        />

        <label htmlFor={id + "-price"}>Price</label>
        <input
          id={id + "-price"}
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        {errorMessage && <p className="error">{errorMessage}</p>}

        <button type="submit">Submit</button>
      </form>

      <div className="admin-list">
        <h2>Manage Coffee</h2>
        {coffees.map((coffee) => (
          <AdminCoffeeRow key={coffee.id} coffee={coffee} />
        ))}
      </div>
    </div>
  );
}

export default AdminPortal;
