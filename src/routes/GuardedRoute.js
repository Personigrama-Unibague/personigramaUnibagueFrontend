import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const GuardedRoute = ({
                        path,
                        element: Element,
                        protected: isProtected,
                        ...props
                      }) => {
  const loginTime = Cookies.get("loginTime");
  const twentyFourHours = 24 * 60 * 60 * 1000;
  const currentTime = new Date().getTime();

  if (currentTime - loginTime >= twentyFourHours) {
    Cookies.remove("username");
    Cookies.remove("jwt");
    Cookies.remove("loginTime");
  }

  const jwt = Cookies.get("jwt");
  const user = Cookies.get("username");

  if (jwt) {
    const decodedToken = jwtDecode(jwt); // Updated method call
    const jwtUser = decodedToken.sub;

    if (user === jwtUser) {
      return (
          <Routes>
            <Route path="/" element={Element} />
          </Routes>
      );
    } else {
      window.alert("Error Autenticación");
      return <Navigate to="/adminLogin" replace />;
    }
  } else {
    window.alert("Debes loguearte para acceder a este link");
    return <Navigate to="/adminLogin" replace />;
  }
};

export default GuardedRoute;
