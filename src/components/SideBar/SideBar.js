import { makeStyles } from '@mui/styles';
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Link } from "react-router-dom";
import * as React from "react";

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
          <Link style={{ color: "#193F76" }} to="/">
            Organigrama
          </Link>
        </ListItem>
        <ListItem button>
          <Link style={{ color: "#193F76" }} to="/adminUnidades">
            Administrar Unidades
          </Link>
        </ListItem>
        <ListItem button>
          <Link style={{ color: "#193F76" }} to="/adminUsuarios">
            Administrar Usuarios
          </Link>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
