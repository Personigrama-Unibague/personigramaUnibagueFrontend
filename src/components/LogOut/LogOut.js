import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import InputOutlinedIcon from "@mui/icons-material/InputOutlined";
import * as React from "react";
import Cookies from "js-cookie";

function LogOut() {
  const logOut = () => {
    Cookies.remove("username");
    Cookies.remove("jwt");
    Cookies.remove("loginTime");
    setTimeout(window.location.reload(), 10000);
  };
  const logOutConfirmation = () => {
    const confirmed = window.confirm(
      "¿Estás seguro de que deseas cerrar sesión: " + username + "?"
    );
    if (confirmed) {
      logOut();
    }
  };
  const username = Cookies.get("username");
  return (
    <div >
      <IconButton
        variant="outlined"
        onClick={() => logOutConfirmation()}
        style={{
          borderRadius: "10px",
          color: "white",
        }}
      >
        <InputOutlinedIcon          
          color="inherit"
        >
          <MenuIcon />
        </InputOutlinedIcon>
      </IconButton>
    </div>
  );
}

export default LogOut;
