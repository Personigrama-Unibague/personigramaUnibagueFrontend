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
import { getFuncionarios, getEmployeeByUnity } from "../../api/funcionarios";
import BannerPersonal from "../../utils/images/BannerPersonal.png";
import BannerPersonalSecundario from "../../utils/images/BannerPersonalSecundario.png";

import { useLocation, useParams } from "react-router-dom";

import "./Personigrama.css";
import { getAllRolesByUnity } from "../../api/roles";

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
  const [roles, setRoles] = useState([]);
  let params = useParams();

  useLayoutEffect(() => {
    (async () => {
      try {
        const prueba = await getEmployeeByUnity(params.unidad);
        setFuncionarios(prueba);
        const rol = await getAllRolesByUnity(params.unidad);
        setRoles(rol);
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

      {/* Primario */}
      <div className="personigramaCards">
        <Grid container spacing={2} className="gridContainer" sx={{ pb: 2 }}>
          <Grid item md={9} className="imageContainer">
            <img src={BannerPersonal} className="bannerPersonal" />
            <div className="nombreBannerPrincipal">
              <p className="personigrama">PERSONIGRAMA</p>
              <p className="unidad">{params.nombre}</p>
            </div>
          </Grid>
          <Grid item md={3} className="imageContainer">
            {funcionarios?.map((func) => {
              if (func.id_jerar == 1) {
                return (
                  <Grid item className="personaCard" key={func.id}>
                    <PersonigramaCard personal={func} />
                  </Grid>
                );
              }
            })}
          </Grid>
        </Grid>

        {/* Banner */}
        {roles?.map((data) => (
          <>
            {data.id_jerar != 0 && data.id_jerar != 1 ? (
              <div key={data.id}>
                <Grid container className="gridContainer">
                  <Grid item xs={12} md={12} className="imageContainer">
                    <img
                      src={BannerPersonalSecundario}
                      className="bannerPersonalSecundario"
                    />
                    <div className="nombreBanner">
                      <p className="personigrama">SECCIÓN</p>
                      <p className="unidad">{data.nombre}</p>
                    </div>
                  </Grid>
                </Grid>

                <div className="personigramaCards">
                  <Grid container spacing={3} className="gridContainer">
                    {funcionarios?.map((func) => {
                      if (func.id_jerar == data.id_jerar) {
                        return (
                          <Grid item className="personaCard" key={func.id}>
                            <PersonigramaCard personal={func} />
                          </Grid>
                        );
                      }
                    })}
                  </Grid>
                </div>
              </div>
            ) : (
              <></>
            )}
          </>
        ))}

        {/* Default */}

        <Grid item xs={12} md={12} className="imageContainer">
          <img src={BannerPersonal} className="bannerPersonalSecundario" />
          <div className="nombreBanner">
            <p className="personigrama">NUESTROS</p>
            <p className="unidad">INTEGRANTES</p>
          </div>
        </Grid>

        <div className="personigramaCards">
          <Grid container spacing={3} className="gridContainer">
            {funcionarios?.map((func) => {
              if (func.id_jerar == 0) {
                return (
                  <Grid item className="personaCard" key={func.id}>
                    <PersonigramaCard personal={func} />
                  </Grid>
                );
              }
            })}
          </Grid>
        </div>
      </div>
    </Box>
  );
}
