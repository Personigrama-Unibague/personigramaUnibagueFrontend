import React, { Component } from "react";
import { useRoutes } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import GlobalStyles from "./components/GlobalStyles";
import theme from "./theme";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  //const routing = useRoutes(Array.isArray(AppRoutes) ? AppRoutes : []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppRoutes />
    </ThemeProvider>
  );
};

export default App;
