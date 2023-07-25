import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLogin from "../pages/AdminLogin/AdminLogin";
import Personigrama from "../pages/Personigrama/Personigrama";
import AdminUnidades from "../pages/AdminUnidades/AdminUnidades";
import AdminUsuarios from "../pages/AdminUsuarios/AdminUsuarios";
import ConfigurarSecciones from "../pages/ConfigurarSecciones/ConfigurarSecciones";
import SeccionFuncionarios from "../pages/SeccionFuncionarios/SeccionFuncionarios";
import NotFound from "../pages/NotFound/NotFound";
import Organigrama from "../pages/Organigrama/Organigrama";
import GuardedRoute from "./GuardedRoute";

const routes = [
  { path: "/", element: <Organigrama /> },
  { path: "/personigrama/:unidad/:nombre", element: <Personigrama /> },
  { path: "/adminLogin", element: <AdminLogin /> },
  {
    path: "/adminUnidades/*",
    element: (
      <GuardedRoute
        path="/adminUnidades"
        element={<AdminUnidades />}
        protected={true}
      />
    ),
  },
  {
    path: "/adminUsuarios/*",
    element: (
      <GuardedRoute
        path="/adminUsuarios/*"
        element={<AdminUsuarios />}
        protected={true}
      />
    ),
  },
  {
    path: "/confiSecciones/:unidad/:nombre/*",
    element: (
      <GuardedRoute
        path="/confiSecciones/:unidad/:nombre"
        element={<ConfigurarSecciones />}
        protected={true}
      />
    ),
  },
  {
    path: "/seccionFuncionarios/:unidad/:nombre/*",
    element: (
      <GuardedRoute
        path="/seccionFuncionarios/:unidad/:nombre"
        element={<SeccionFuncionarios />}
        protected={true}
      />
    ),
  },
  { path: "*", element: <NotFound /> },
];

const AppRoutes = () => (
  <Routes>
    {routes.map((route, index) => (
      <Route key={index} path={route.path} element={route.element} />
    ))}
  </Routes>
);

export default AppRoutes;
