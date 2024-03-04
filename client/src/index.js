import React from "react";
import App from "./App";
import "./index.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter} from "react-router-dom";



const container = document.getElementById("root");
const root = createRoot(container);
root.render( <React.StrictMode>
    <BrowserRouter >
    <App />
    </BrowserRouter>
  </React.StrictMode>);

