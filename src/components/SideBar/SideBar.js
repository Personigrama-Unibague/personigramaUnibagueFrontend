import * as React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import SchemaIcon from "@mui/icons-material/Schema";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import Cookies from "js-cookie";
import {
  Box,
  Button,
  Divider,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
  title: {
    color: "white",
    paddingTop: "15px",
    paddingLeft: "32%",
    fontSize: "30px",
    fontWeight: "bold",
  },
  toolbar: theme.mixins.toolbar,
  titleContainer: {
    backgroundColor: "#193F76",
    paddingBottom: "15px",
  },
}));
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

const Sidebar = ({ open, onClose }) => {
  const classes = useStyles();

  const toggleDrawer = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    onClose();
  };

  const list = () => (
    <Box
      sx={{ width: 300 }}
      role="presentation"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <div />
      <div className={classes.titleContainer}>
        <p className={classes.title}>MENU</p>
      </div>
      <List>
        <ListItem>
          {/* Organigrama */}
          <ListItemButton>
            <ListItemIcon>
              <SchemaIcon />
            </ListItemIcon>
            <Link style={{ color: "#193F76" }} to="/">
              Organigrama
            </Link>
          </ListItemButton>
        </ListItem>
        <Divider />
        {/* Admin Unidades */}
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <DesignServicesIcon />
            </ListItemIcon>
            <Link style={{ color: "#193F76" }} to="/adminUnidades">
              Administrar Unidades
            </Link>
          </ListItemButton>
        </ListItem>
        <Divider />
        {/* Adminstrar Usuarios */}
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <PeopleAltIcon />
            </ListItemIcon>
            <Link style={{ color: "#193F76" }} to="/adminUsuarios">
              Administrar Usuarios
            </Link>
          </ListItemButton>
        </ListItem>
        <Divider />
        {/* Cerrar Sesion */}
        <ListItem onClick={logOutConfirmation}>
          <ListItemButton>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemIcon style={{ color: "#193F76" }}>
              Cerrar Sesión
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
        <Divider />
      </List>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer}>Open Left Sidebar</Button>
      <Drawer anchor="left" open={open} onClose={toggleDrawer}>
        {list()}
      </Drawer>
    </div>
  );
};

export default Sidebar;
