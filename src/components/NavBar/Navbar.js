import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, IconButton, Box } from "@material-ui/core";
import Sidebar from "../../components/SideBar/SideBar";
import AdminUsername from "../AdminUsername/AdminUsername";
import LogOut from "../LogOut/LogOut";
import MenuIcon from "@mui/icons-material/Menu";
import * as React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
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
            <Typography variant="h3">{title}</Typography>
          </Box>

          {/* Right  */}
          <Box display="flex" alignItems="center">
            <AdminUsername />
            <LogOut />
          </Box>
        </Toolbar>
      </AppBar>
      {/* Sidebar */}
      <Sidebar open={isSidebarOpen} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
      </main>
    </div>
  );
};

export default Navbar;
