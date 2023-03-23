import React from 'react';
import HomePage from '../pages/HomePage';
import AdminLogin from '../pages/AdminLogin/AdminLogin';
import Personigrama from '../pages/Personigrama/Personigrama';


const routes = [
  {
    path: '/',
    element: <HomePage/>,
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
    element: <AdminUsuaraios/>,
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
  }
];

export default routes;
 