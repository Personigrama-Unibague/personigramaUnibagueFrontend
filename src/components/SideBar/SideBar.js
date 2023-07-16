// Sidebar.js
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
  toolbar: theme.mixins.toolbar,
}));

const Sidebar = ({ open }) => {
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.toolbar} />
      <List>
        <ListItem button>
          <Link style={{ color: "black" }} to="/organigrama">
            Organigrama
          </Link>
        </ListItem>
        <ListItem button>
          <Link style={{ color: "black" }} to="/adminUnidades">
            Administrar Unidades
          </Link>
        </ListItem>
        <ListItem button>
          <Link style={{ color: "black" }} to="/adminUsuarios">
            Administrar Usuarios
          </Link>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
