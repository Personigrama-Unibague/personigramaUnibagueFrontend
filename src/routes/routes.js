import Prueba from '../components/prueba';
import React, { Component }  from 'react';

const routes = [
  {
    path: '/',
    element: <Prueba />,
    children: [
      //{ path: 'Login', element: <Prueba /> },
    ]
  }
];

export default routes;
 