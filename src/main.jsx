import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.js";
import { StoreProvider } from "./context/StoreContext.jsx";
import "./assets/styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>
);
