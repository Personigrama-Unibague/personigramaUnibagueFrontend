import React from "react";
import { ThemeProvider } from "@mui/styles";
import GlobalStyles from "./components/GlobalStyles";
import theme from "./theme";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppRoutes />
    </ThemeProvider>
  );
};

export default App;
