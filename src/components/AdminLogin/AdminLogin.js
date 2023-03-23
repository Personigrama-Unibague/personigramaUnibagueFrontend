import { Button, Grid, makeStyles, TextField, AppBar } from "@material-ui/core";
import fondo from "../../utils/images/adminLoginBackground.jpeg";
import navbar from "../../utils/images/navbar.jfif";
import React from "react";
import "./styles.css";
import InputAdornment from "@mui/material/InputAdornment";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `url(${fondo})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
  },
  navbar: {
    backgroundImage: `url(${navbar})`,
  },
}));

function AdminLogin() {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={6} md={6}></Grid>
      <Grid
        rowSpacing={3}
        xs={6}
        md={6}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Grid item>
          <TextField
            placeholder="Usuario"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person2OutlinedIcon />
                </InputAdornment>
              ),
            }}
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "30px",
              width: "443px",
              height: "42px",
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            placeholder="Contraseña"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <HttpsOutlinedIcon />
                </InputAdornment>
              ),
            }}
            style={{
              backgroundColor: "#FFFFFF",
              margin: "20px",
              borderRadius: "30px",
              width: "443px",
              height: "42px",
            }}
          />
        </Grid>
        <Grid item>
          <Button style={{ backgroundColor: "#04B8E2", borderRadius: "30px" }}>
            Identificarse
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default AdminLogin;
