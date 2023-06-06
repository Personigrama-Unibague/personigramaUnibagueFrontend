import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import IconButton from "material-ui/IconButton";
import React from "react";

function LogOut() {

  const logOut = () => {
    localStorage.setItem("loggedIn", false);
    localStorage.setItem("username", "");
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
  const username = localStorage.getItem("username")
  return (
    <div>
      <IconButton
        variant="outlined"
        onClick={() => logOutConfirmation()}
        style={{
          marginRight:"10px",
          borderRadius: "10px",
          color: "white",
        }}
      >
        <AccountCircleOutlinedIcon style={{ color: "white" }} />
      </IconButton>
    </div>
  );
}

export default LogOut;
