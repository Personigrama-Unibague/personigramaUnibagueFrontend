import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    bottom: 16,
    left: 16,
    backgroundColor: "rgb(9, 113, 184, 0.7)",
    borderRadius: "10px",
    border: "2px solid rgb(27, 93, 167, 0.6)",
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
    borderRadius: "10px",
  },
}));

function FloatingButton() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Box className={classes.container}>
        <Button variant="contained" color="primary" className={classes.button}>
          <KeyboardDoubleArrowLeftIcon />
        </Button>
        <Button variant="contained" color="primary" className={classes.button}>
          <KeyboardDoubleArrowRightIcon />
        </Button>
      </Box>
    </div>
  );
}

export default FloatingButton;
