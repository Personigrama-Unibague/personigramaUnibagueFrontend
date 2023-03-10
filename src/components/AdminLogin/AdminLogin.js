import { Button, Grid, makeStyles, TextField } from "@material-ui/core";
import fondo from "../../utils/images/adminLoginBackground.jpeg"
import React from "react";
import "./styles.css";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `url(${fondo})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
  },
}));

function AdminLogin() {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={6} md={6}></Grid>
      <Grid item xs={6} md={6}>
        <form
          className="form"
          style={{ textAlign: "center", alignItems: "center", display: "flex" }}
        >
          <TextField
            labelText="Email"
            id="email"
            formControlProps={{
              fullWidth: true,
            }}
            type="text"
          />
          <TextField
            labelText="Password"
            id="password"
            formControlProps={{
              fullWidth: true,
            }}
            type="password"
          />

          <Button type="button" color="primary">
            Log in
          </Button>
        </form>
      </Grid>
    </Grid>
  );
}

export default AdminLogin;
