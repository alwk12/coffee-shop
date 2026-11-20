import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { CoffeeProvider } from "./context/CoffeeContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CoffeeProvider>
        <App />
      </CoffeeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
