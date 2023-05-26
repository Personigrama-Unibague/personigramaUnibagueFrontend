import { Route } from "react-router-dom";
import React from "react";
import HomePage from "../pages/HomePage";
import AdminLogin from "../pages/AdminLogin/AdminLogin";
import Personigrama from "../pages/Personigrama/Personigrama";
import PrincipalTemporal from "../pages/PrincipalTemporal";
import AdminUnidades from "../pages/AdminUnidades/AdminUnidades";
import AdminUsuarios from "../pages/AdminUsuarios/AdminUsuarios";
import ConfigurarSecciones from "../pages/ConfigurarSecciones/ConfigurarSecciones";
import SeccionFuncionarios from "../pages/SeccionFuncionarios/SeccionFuncionarios";
import NotFound from "../pages/NotFound/NotFound";
import PruebasJson from "../pages/PruebasJson";
import PruebaLogin from "../pages/PruebaLogIn/PruebaLogIn";

const routes = [
  { path: "/", element: <PrincipalTemporal /> },
  { path: "/homePage", element: <HomePage /> },
  { path: "/personigrama/:unidad/:nombre", element: <Personigrama /> },
  { path: "/adminLogin", element: <AdminLogin /> },
  { path: "/adminUnidades", element: <AdminUnidades /> },
  { path: "/adminUsuarios", element: <AdminUsuarios /> },
  { path: "/confiSecciones/:unidad/:nombre", element: <ConfigurarSecciones /> },
  { path: "/seccionFuncionarios/:unidad/:nombre", element: <SeccionFuncionarios /> },
  { path: "/pruebasjson", element: <PruebasJson /> },
  { path: "/pruebaLogin", element: <PruebaLogin /> },
  { path: "*", element: <NotFound /> }
];

export default routes;