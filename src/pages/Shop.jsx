import { useState, useContext } from "react";
import { CoffeeContext } from "../context/CoffeeContext";
import CoffeeCard from "../components/CoffeeCard";

function Shop() {
  const { coffees, loading, error } = useContext(CoffeeContext);
  const [search, setSearch] = useState("");
  const [selectedOrigins, setSelectedOrigins] = useState([]);

  const origins = [];
  coffees.forEach((coffee) => {
    if (!origins.includes(coffee.origin)) {
      origins.push(coffee.origin);
    }
  });

  function handleOriginChange(origin) {
    if (selectedOrigins.includes(origin)) {
      setSelectedOrigins(selectedOrigins.filter((item) => item !== origin));
    } else {
      setSelectedOrigins([...selectedOrigins, origin]);
    }
  }

  const filteredCoffees = coffees.filter((coffee) => {
    const matchesSearch = coffee.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesOrigin =
      selectedOrigins.length === 0 || selectedOrigins.includes(coffee.origin);
    return matchesSearch && matchesOrigin;
  });

  if (loading) {
    return <p className="message">Loading...</p>;
  }

  if (error) {
    return <p className="message">{error}</p>;
  }

  return (
    <div className="shop">
      <aside className="sidebar">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {origins.map((origin) => (
          <label key={origin} className="origin-label">
            <input
              type="checkbox"
              checked={selectedOrigins.includes(origin)}
              onChange={() => handleOriginChange(origin)}
            />
            {origin}
          </label>
        ))}
      </aside>
      <section className="coffee-grid">
        {filteredCoffees.map((coffee) => (
          <CoffeeCard key={coffee.id} coffee={coffee} />
        ))}
        {filteredCoffees.length === 0 && <p>No coffee found.</p>}
      </section>
    </div>
  );
}

export default Shop;
