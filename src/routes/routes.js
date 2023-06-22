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
  { Path: "/", element: <PrincipalTemporal /> },
  { Path: "/homePage", element: <HomePage /> },
  { Path: "/personigrama/:unidad/:nombre", element: <Personigrama /> },
  { Path: "/adminLogin", element: <AdminLogin /> },
  { Path: "/adminUnidades", element: <AdminUnidades /> },
  { Path: "/adminUsuarios", element: <AdminUsuarios /> },
  { Path: "/confiSecciones/:unidad/:nombre", element: <ConfigurarSecciones /> },
  { Path: "/seccionFuncionarios/:unidad/:nombre", element: <SeccionFuncionarios /> },
  { Path: "/pruebasjson", element: <PruebasJson /> },
  { Path: "/pruebaLogin", element: <PruebaLogin /> },
  { Path: "*", element: <NotFound /> }
];

export default routes;