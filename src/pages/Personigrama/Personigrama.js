import React, { Component, useState, useEffect, useLayoutEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonigramaCard from "../../components/PersonigramaCard/PersonigramaCard";
import Personal from "../../personal.json";
import Grid from "@mui/material/Grid";
import {
  getFuncionarios,
  getFuncionariosByUnidad,
} from "../../api/funcionarios";
import BannerPersonal from "../../utils/images/BannerPersonal.png";
import { useLocation, useParams } from "react-router-dom";


import "./Personigrama.css";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "30px",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function Personigrama() {
  const [funcionarios, setFuncionarios] = useState([]);
  

  let params = useParams(); 
  

  useLayoutEffect(() => {
    (async () => {
      try {
        const func = await getFuncionarios();
        const prueba = await getFuncionariosByUnidad(params.unidad);
        setFuncionarios(prueba);
        console.log("funcionarios:");
        console.log(prueba);
      } catch (err) {
        console.log("Error API");
      }
    })();
  }, []);

  

  return (
    /* Navbar */
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: "#193F76" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Atras
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Toolbar>
      </AppBar>

      {/* Cards */}
      <div className="personigramaCards">
        <Grid container spacing={3} className="gridContainer">
          {/* Banner */}
          <Grid item xs={12} md={9} className="imageContainer">
            <img src={BannerPersonal} className="bannerPersonal" />
            <div className="nombreBanner">
              <p className="personigrama">PERSONIGRAMA</p>
              <p className="unidad">{params.nombre}</p>
            </div>
          </Grid>
          {/* Cards */}
          {funcionarios?.map((data) => (
            <Grid item className="personaCard">
              <PersonigramaCard personal={data} />
            </Grid>
          ))}
        </Grid>
      </div>
    </Box>
  );
}
