import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Menu } from "./Menu";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Admin } from "./Admin";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <nav className="mb-2 bg-orange-200 p-2">
        <Link to="/">Menu</Link> | <Link to="/admin">Admin</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
