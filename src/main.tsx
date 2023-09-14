import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Menu } from "./Menu";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Admin } from "./Admin";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Toaster />
      <nav className="p-2 pl-4 mb-2 bg-orange-200">
        <Link to="/">Menu</Link> | <Link to="/admin">Admin</Link>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/:foodId" element={<Admin />} />
        </Routes>
      </main>
    </BrowserRouter>
  </React.StrictMode>
);
