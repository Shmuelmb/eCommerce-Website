import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Context } from "./components/GlobalContext/GlobalContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId="804975069028-dff4hqv2kbsoaj0b62v5dlceu5svuc14.apps.googleusercontent.com">
    <Context>
      <App />
    </Context>
  </GoogleOAuthProvider>
);
