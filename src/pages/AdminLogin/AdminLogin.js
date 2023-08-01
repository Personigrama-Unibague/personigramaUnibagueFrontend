import {
  Button,
  Grid,
  TextField,
  IconButton,
} from "@mui/material";
import { makeStyles } from '@mui/styles';
import fondo from "../../utils/images/adminLoginBackground.jpeg";
import navbar from "../../utils/images/navbar.jfif";
import logoUnibague from "../../utils/images/logoUnibague.PNG";
import React, { useState } from "react";
import "./stylesLogin.css";
import { useNavigate } from "react-router-dom";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import { GoogleOAuthProvider } from "@react-oauth/google";
import {
  loginAuthentication,
} from "../../api/loginAdmin";
import Cookies from "js-cookie";

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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/adminUnidades");
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await loginAuthentication(username, password);

      if (response.status === 200) {
        const jwt = response.data;
        Cookies.set("jwt", jwt);
        Cookies.set("username", username);
        Cookies.set("loginTime", new Date().getTime());
        setTimeout(handleRedirect(), 9000);
      } else {
        window.alert("Usuario o contraseña incorrectos");
        //setTimeout(window.location.reload(), 10000);
      }
    } catch (err) {
      window.alert("Usuario o Contraseña Incorrecto");
    }
  };

  return (
    <GoogleOAuthProvider clientId="577630477033-tlna5td2dva4mf43g2ciarsfcvr79pcr.apps.googleusercontent.com">
      <Grid container component="main" className={classes.root}>
        <Grid item sm={6} md={6}></Grid>
        <Grid
          item
          rowspacing={3}
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
            <img src={logoUnibague} className="logoImage" alt=""></img>
          </Grid>
          {/*Personigrama*/}
          <Grid item>
            <div className="personigramaLogin">PERSONIGRAMA</div>
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
              {/* <button>
                <Google />
              </button> */}
              <EmailRoundedIcon />
            </IconButton>
          </Grid>

          {/* Usuario */}
          <Grid item>
            <TextField
              className="textFieldLogIn"
              placeholder="Usuario"
              value={username}
              onChange={handleUsernameChange}
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "30px",
              }}
              InputProps={{
                startAdornment: (
                  <IconButton
                    color="default"
                    sx={{ p: "10px" }}
                    style={{
                      borderRadius: "30px 0px 0px 30px",
                      backgroundColor: "#04B8E2",
                      left: "-15px",
                      padding: "16px"
                    }}
                    position="start"
                    disabled={true}
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
              className="textFieldLogIn"
              placeholder="Contraseña"
              value={password}
              onChange={handlePasswordChange}
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "30px",
              }}
              InputProps={{
                startAdornment: (
                  <IconButton
                    color="default"
                    sx={{ p: "10px" }}
                    style={{
                      borderRadius: "30px 0px 0px 30px",
                      backgroundColor: "#04B8E2",
                      left: "-15px",
                      padding: "16px"
                    }}
                    position="start"
                    disabled={true}
                  >
                    <HttpsOutlinedIcon style={{ color: "white" }} />
                  </IconButton>
                ),
                type: "password",
              }}
            />
          </Grid>

          <div style={{ paddingBottom: "40px" }}></div>

          {/* Button */}
          <Grid item>
            <Button
              onClick={handleSubmit}
              style={{
                backgroundColor: "#04B8E2",
                borderRadius: "30px",
                color: "white",
                padding: "10px 30px",
              }}
            >
              INGRESAR
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </GoogleOAuthProvider>
  );
}

export default AdminLogin;
