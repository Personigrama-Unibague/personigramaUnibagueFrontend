import React from "react";
import { useState } from "react";
import { makeStyles } from '@mui/styles';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

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
    color: "white",
  },
}));

function FloatingButton() {
  const classes = useStyles();
  const [currentDepth, setDepth] = useState(1);

  const handleIncreaseDepth = () => {
    setDepth(20);
    console.log(currentDepth);
    const depth = localStorage.getItem("niveles");
    localStorage.setItem("depth", depth);
    setTimeout(window.location.reload(), 10000);
  };

  const handleDecreaseDepth = () => {
    setDepth(1);
    localStorage.setItem("depth", 1);
    setTimeout(window.location.reload(), 10000);
  };

  const addDepth = () => {
    if (
      parseInt(localStorage.getItem("depth")) + 1 >=
      parseInt(localStorage.getItem("niveles"))
    ) {
      window.alert("No hay más unidades en el organigrama");
    } else {
      localStorage.setItem(
        "depth",
        parseInt(localStorage.getItem("depth")) + 1
      );
      console.log(currentDepth);
      setTimeout(window.location.reload(), 10);
    }
  };

  const restDepth = () => {
    if (parseInt(localStorage.getItem("depth")) - 1 <= 0) {
      window.alert("Esta es la unidad padre");
    } else {
      localStorage.setItem(
        "depth",
        parseInt(localStorage.getItem("depth")) - 1
      );
      console.log(currentDepth);
      setTimeout(window.location.reload(), 10);
    }
  };

  return (
    <div className={classes.root}>
      <Box className={classes.container}>
        <Button
          variant="contained"
          className={classes.button}
          onClick={() => handleDecreaseDepth()}
        >
          <KeyboardDoubleArrowLeftIcon className={classes.icon} />
        </Button>

        <Button
          variant="contained"
          className={classes.button}
          onClick={() => restDepth()}
        >
          <KeyboardArrowLeftIcon className={classes.icon} />
        </Button>
        <Button
          variant="contained"
          className={classes.button}
          onClick={() => addDepth()}
        >
          <KeyboardArrowRightIcon fontSize="small" className={classes.icon} />
        </Button>
        <Button
          variant="contained"
          className={classes.button}
          onClick={() => handleIncreaseDepth()}
        >
          <KeyboardDoubleArrowRightIcon className={classes.icon} />
        </Button>
      </Box>
    </div>
  );
}

export default FloatingButton;
