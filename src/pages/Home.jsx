import useFetch from "../hooks/useFetch";

function Home() {
  const { data } = useFetch("http://localhost:3000/store_info");
  const store = data[0];

  return (
    <div className="hero">
      <h1>{store ? store.name : "Coffee R Us"}</h1>
      <p>
        {store ? store.description : "The go to store for your coffee needs"}
      </p>
      {store && store.phone_number && <p>Call us: {store.phone_number}</p>}
    </div>
  );
}

export default Home;
