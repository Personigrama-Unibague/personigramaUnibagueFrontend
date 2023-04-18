import {
  Button,
  Grid,
  makeStyles,
  TextField,
  AppBar,
  IconButton,
} from "@material-ui/core";
import fondo from "../../utils/images/adminLoginBackground.jpeg";
import navbar from "../../utils/images/navbar.jfif";
import logoUnibague from "../../utils/images/logoUnibague.PNG";
import React from "react";
import "./styles.css";
import InputAdornment from "@mui/material/InputAdornment";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import { width } from "@mui/system";
import { GoogleOAuthProvider } from "@react-oauth/google";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `url(${fondo})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    width: "100vw",
  },
  navbar: {
    backgroundImage: `url(${navbar})`,
  },
}));

function AdminLogin() {
  const classes = useStyles();

  return (
    <GoogleOAuthProvider clientId="577630477033-tlna5td2dva4mf43g2ciarsfcvr79pcr.apps.googleusercontent.com">
      <Grid container component="main" className={classes.root}>
        <Grid item sm={6} md={6}></Grid>
        <Grid
          rowSpacing={3}
          md={6}
          sm={6}
          xs={12}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {/*Logo Unibague*/}
          <Grid item>
            <img src={logoUnibague} className="logoImage"></img>
          </Grid>
          {/*Personigrama*/}
          <Grid item>
            <div className="personigrama">PERSONIGRAMA</div>
          </Grid>
          {/*Unibague*/}
          <Grid item>
            <div className="unibague">Unibagué</div>
          </Grid>
          {/*Gmail Logo*/}
          <Grid item>
            <IconButton
              style={{
                backgroundColor: "white",
                color: "#193F76",
                marginTop: "40px",
                marginBottom: "10px",
              }}
            >
              <EmailRoundedIcon/>
            </IconButton>
          </Grid>

          {/* Usuario */}
          <Grid item>
            <TextField
              className="textField"
              placeholder="Usuario"
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "30px",
              }}
              InputProps={{
                startAdornment: (
                  <IconButton
                    color="white"
                    sx={{ p: "10px" }}
                    style={{
                      borderRadius: "30px 0px 0px 30px",
                      backgroundColor: "#04B8E2",
                    }}
                    position="start"
                  >
                    <Person2OutlinedIcon style={{ color: "white" }} />
                  </IconButton>
                ),
              }}
            />
          </Grid>

          <div style={{ paddingBottom: "20px" }}></div>

          {/* Contraseña */}
          <Grid item>
            <TextField
              className="textField"
              placeholder="Contraseña"
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "30px",
              }}
              InputProps={{
                startAdornment: (
                  <IconButton
                    color="white"
                    sx={{ p: "10px" }}
                    style={{
                      borderRadius: "30px 0px 0px 30px",
                      backgroundColor: "#04B8E2",
                    }}
                    position="start"
                  >
                    <HttpsOutlinedIcon style={{ color: "white" }} />
                  </IconButton>
                ),
              }}
            />
          </Grid>

          <div style={{ paddingBottom: "40px" }}></div>

          {/* Button */}
          <Grid item>
            <Button
              style={{
                backgroundColor: "#04B8E2",
                borderRadius: "30px",
                color: "white",
                padding: "10px 30px",
              }}
            >
              Identificarse
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </GoogleOAuthProvider>
  );
}

export default AdminLogin;