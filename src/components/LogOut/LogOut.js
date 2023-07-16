import IconButton from "material-ui/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import InputOutlinedIcon from "@mui/icons-material/InputOutlined";

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
  const username = localStorage.getItem("username");
  return (
    <div style={{ paddingLeft: "10px" }}>
      <IconButton
        variant="outlined"
        onClick={() => logOutConfirmation()}
        style={{
          marginRight: "10px",
          borderRadius: "10px",
          color: "white",
        }}
      >
        <InputOutlinedIcon
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 3 }}
        >
          <MenuIcon />
        </InputOutlinedIcon>
      </IconButton>
    </div>
  );
}

export default LogOut;
