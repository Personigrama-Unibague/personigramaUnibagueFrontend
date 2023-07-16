import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "./stylesNotFound.css";

function NotFound() {
  return (
    <Box
      className="container"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <div className="info">
        <Typography variant="h1">404</Typography>
        <Typography variant="h6">
          La pagina que estas buscando no existe
        </Typography>
        <Link style={{ color: "white" }} to="/">
          HomePage
        </Link>
      </div>
    </Box>
  );
}

export default NotFound;
