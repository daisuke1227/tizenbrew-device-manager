import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router";
import "./App.css";
import { GlobalProvider } from './components/GlobalContext.jsx';

ReactDOM.createRoot(document.getElementById("root")).render(
    <GlobalProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GlobalProvider>
);