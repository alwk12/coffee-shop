function CoffeeCard({ coffee }) {
  return (
    <div className="coffee-card">
      <h3>{coffee.name}</h3>
      <p>{coffee.description}</p>
      <p>{coffee.origin}</p>
      <p>${Number(coffee.price).toFixed(2)}</p>
    </div>
  );
}

export default CoffeeCard;
