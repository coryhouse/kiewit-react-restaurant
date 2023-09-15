import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Menu } from "./Menu";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Admin } from "./Admin";
import { Toaster } from "react-hot-toast";
import { ErrorBoundary } from "react-error-boundary";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<div>Oops! (Root error boundary)</div>}>
      <BrowserRouter>
        <Toaster />
        <nav className="p-2 pl-4 mb-2 bg-orange-200">
          <Link to="/">Menu</Link> | <Link to="/admin">Admin</Link>
        </nav>
        <ErrorBoundary fallback={<div>Oops! (main error boundary)</div>}>
          <main>
            <Routes>
              <Route
                path="/"
                element={
                  <ErrorBoundary fallback={<div>Oops! Menu failed.</div>}>
                    <Menu />
                  </ErrorBoundary>
                }
              />
              <Route
                path="/admin"
                element={
                  <ErrorBoundary fallback={<div>Oops! Admin failed.</div>}>
                    <Admin />
                  </ErrorBoundary>
                }
              />
              <Route path="/admin/:foodId" element={<Admin />} />
            </Routes>
          </main>
        </ErrorBoundary>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
