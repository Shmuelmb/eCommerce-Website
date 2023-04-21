import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Context } from "./components/GlobalContext/GlobalContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Context>
    <App />
  </Context>
);
