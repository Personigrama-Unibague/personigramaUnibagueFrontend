import React, { Component }  from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from './components/GlobalStyles';
import theme from './theme';
import routes from './routes/routes';

const App = () => {
  
  const routing = useRoutes(routes);

  return (
    <ThemeProvider theme={theme}>
        <GlobalStyles />
        {routing}
      </ThemeProvider>
  );
}

export default App;
