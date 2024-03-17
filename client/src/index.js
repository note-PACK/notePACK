import React from "react";
import ReactDOM from "react-dom/client";
import { createRoot } from "react-dom/client";
import App from "./components/App.jsx";
import "./style.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //remove React.StrictMode. Strictmode renders the screen twice. Because the gitHub access code is only valid once, a second re-render wil cause it to fail.
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
