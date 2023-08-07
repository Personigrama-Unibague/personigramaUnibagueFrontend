import * as React from "react";
import { useState } from "react";
import { makeStyles } from "@mui/styles";
import "./Navbar.css";
import { AppBar, Toolbar, IconButton, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "../../components/SideBar/SideBar";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import AdminUsername from "../AdminUsername/AdminUsername";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "#193f76 !important",
  },
  title: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));
const Navbar = ({ title }) => {
  const classes = useStyles();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          {/* Sidebar */}
          <IconButton
            color="inherit"
            aria-label="open sidebar"
            onClick={handleSidebarToggle}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          {/* Titulo Navbar */}
          <Box flex={1} display="flex" justifyContent="center">
            <p className="titleNav">{title}</p>
          </Box>

          {/* Right  */}
          <Box display="flex" alignItems="center">
            <AdminUsername />
            <Link to={"/adminUnidades"}>
              <IconButton style={{ color: "white" }}>
                <KeyboardReturnIcon />
              </IconButton>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      {/* Sidebar */}
      <Sidebar open={isSidebarOpen} onClose={handleSidebarClose} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
      </main>
    </div>
  );
};

export default Navbar;
