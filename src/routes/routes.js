import React from 'react';
import HomePage from '../components/HomePage/HomePage';
import AdminLogin from '../components/AdminLogin/AdminLogin';


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
  }
];

export default routes;
 