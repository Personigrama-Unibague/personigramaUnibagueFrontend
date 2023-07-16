import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    bottom: 10,
    left: 10,
    backgroundColor: "white",
    borderRadius: "15px",
    border: "2px solid rgb(27, 93, 167)",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: theme.palette.background.default,
    borderRadius: 8,
    padding: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(0, 1),
    borderRadius: "15px",
    height: "30px",
    padding: "0",
    minWidth: "50px",
    backgroundColor: "#02AFD8",
    "&:hover": {
      backgroundColor: "rgb(27, 93, 167)",
    },
  },
  icon: {
    color: "white"
  },
}));

function FloatingButton() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Box className={classes.container}>
        <Button variant="contained" className={classes.button}>
          <KeyboardDoubleArrowLeftIcon className={classes.icon} />
        </Button>
        <Button variant="contained" className={classes.button}>
          <KeyboardDoubleArrowRightIcon className={classes.icon} />
        </Button>
      </Box>
    </div>
  );
}

export default FloatingButton;
