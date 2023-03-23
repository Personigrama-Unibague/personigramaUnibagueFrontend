import React from 'react';
import HomePage from '../pages/HomePage';
import AdminLogin from '../pages/AdminLogin/AdminLogin';
import Personigrama from '../pages/Personigrama/Personigrama';
import PrincipalTemporal from '../pages/PrincipalTemporal';
import AdminUnidades from '../pages/AdminUnidades/AdminUnidades';
import AdminUsuarios from '../pages/AdminUsuarios/AdminUsuarios';
import ConfigurarSecciones from '../pages/ConfigurarSecciones/ConfigurarSecciones';


const routes = [
  {
    path: '/',
    element: <PrincipalTemporal/>,
    children: [
      //{ path: 'Login', element: <Prueba /> },
    ]
  },
  {
    path: 'homePage',
    element: <HomePage/>,
    children: [
      //{ path: 'Login', element: <Prueba /> },
    ]
  },
  {
    path: 'personigrama',
    element: <Personigrama />,
    children: [
      //{ path: 'Login', element: <Prueba /> },
    ]
  },
  {
    path: 'adminLogin',
    element: <AdminLogin/>,
    children: [
      //{ path: 'Login', element: <Prueba /> },
    ]
  },
  {
    path: 'adminUnidades',
    element: <AdminUnidades/>,
    children: [
      //{ path: 'Login', element: <Prueba /> },
    ]
  },
  {
    path: 'adminUsuarios',
    element: <AdminUsuarios/>,
    children: [
      //{ path: 'Login', element: <Prueba /> },
    ]
  },,
  {
    path: 'confiSecciones',
    element: <ConfigurarSecciones/>,
    children: [
      //{ path: 'Login', element: <Prueba /> },
    ]
  },
  /* {
    path: '*',
    element: <NotFound/>,
    children: [
    ]
  }, */
  
];

export default routes;
 