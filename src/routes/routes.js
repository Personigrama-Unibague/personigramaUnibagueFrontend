import Prueba from '../components/prueba';

const routes = [
  {
    path: 'app',
    element: <Prueba />,
    children: [
      { path: 'account', element: <Prueba /> },

    ]
  },
  {
    path: '/',
    element: <Prueba />,
    children: [
      { path: 'Login', element: <Prueba /> },
    ]
  }
];

export default routes;
 