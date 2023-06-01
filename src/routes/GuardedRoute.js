import React from "react";
import AdminUnidades from "../pages/AdminUnidades/AdminUnidades";

import { Route, Navigate, Routes } from "react-router-dom";

const GuardedRoute = ({
  path,
  element: Element,
  protected: isProtected,
  ...props
}) => {
  const isAuthenticated = localStorage.getItem("loggedIn");
  const parsedValue = isAuthenticated ? JSON.parse(isAuthenticated) : false;

  if (!parsedValue) {
    window.alert("Debes loguearte para acceder a este link");

    // Si el usuario no está autenticado, redirige a la página de inicio de sesión

    return <Navigate to="/adminLogin" replace />;
  } else if (parsedValue) {
    return (
      <Routes>
        <Route path="/" element={Element} />
      </Routes>
    );
  }

  // Si el usuario está autenticado, redirige a la ruta especificada
};

export default GuardedRoute;
