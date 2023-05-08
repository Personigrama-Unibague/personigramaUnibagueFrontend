import  { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import HomePage from '../pages/HomePage';
import AdminLogin from '../pages/AdminLogin/AdminLogin';
import Personigrama from '../pages/Personigrama/Personigrama';
import PrincipalTemporal from '../pages/PrincipalTemporal';
import AdminUnidades from '../pages/AdminUnidades/AdminUnidades';
import AdminUsuarios from '../pages/AdminUsuarios/AdminUsuarios';
import ConfigurarSecciones from '../pages/ConfigurarSecciones/ConfigurarSecciones';
import SeccionFuncionarios from '../pages/SeccionFuncionarios/SeccionFuncionarios';
import NotFound from '../pages/NotFound/NotFound';
import PruebasJson from '../pages/PruebasJson';
import PruebaLogin from '../pages/PruebaLogIn/PruebaLogIn'

const routes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrincipalTemporal />}></Route>
          <Route path="homePage" element={<HomePage />}></Route>
          <Route path="personigrama" element={<Personigrama />}></Route>
          <Route path="adminLogin" element={<AdminLogin />}></Route>
          <Route path="adminUnidades" element={<AdminUnidades />}></Route>
          <Route path="adminUsuarios" element={<AdminUsuarios />}></Route>
          <Route path="confiSecciones" element={<ConfigurarSecciones />}></Route>
          <Route path="seccionFuncionarios" element={<SeccionFuncionarios />}></Route>
          <Route path="pruebasjson" element={<PruebasJson />}></Route>
          <Route path="pruebaLogin" element={<PruebaLogin />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default routes;