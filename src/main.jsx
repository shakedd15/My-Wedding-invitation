import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { isManagePath } from "./routes.js";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {isManagePath(window.location.pathname) ? null : <App />}
  </StrictMode>
);
