import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from '@mui/icons-material/Logout';
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
    <div>
      <IconButton onClick={() => logOutConfirmation()}>
        <LogoutIcon>
          <MenuIcon />
        </LogoutIcon>
      </IconButton>
    </div>
  );
}

export default LogOut;
