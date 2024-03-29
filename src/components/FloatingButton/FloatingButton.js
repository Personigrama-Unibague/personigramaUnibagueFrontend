import React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import "./floatingButton.css";

function FloatingButton() {
  const [currentDepth, setDepth] = useState(1);

  const handleIncreaseDepth = () => {
    setDepth(20);
    console.log(currentDepth);
    const depth = localStorage.getItem("niveles");
    localStorage.setItem("depth", depth);
    const deptht = parseInt(localStorage.getItem("depth"));
    const calculatedNodeX = calculateNodeX(deptht);
    localStorage.setItem("nodeX", calculatedNodeX);
    setTimeout(window.location.reload(), 10000);
  };

  const handleDecreaseDepth = () => {
    setDepth(1);
    localStorage.setItem("depth", 1);
    const depth = parseInt(localStorage.getItem("depth"));
    const calculatedNodeX = calculateNodeX(depth);
    localStorage.setItem("nodeX", calculatedNodeX);
    setTimeout(window.location.reload(), 10000);
  };
  const calculateNodeX = (depth) => {
    const initialX = 100;
    const subtractionAmount = 240;
    return initialX - subtractionAmount * (depth - 1);
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
      const depth = parseInt(localStorage.getItem("depth"));
      const calculatedNodeX = calculateNodeX(depth);
      localStorage.setItem("nodeX", calculatedNodeX);
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
      const depth = parseInt(localStorage.getItem("depth"));
      const calculatedNodeX = calculateNodeX(depth);
      localStorage.setItem("nodeX", calculatedNodeX);
      setTimeout(window.location.reload(), 10);
    }
  };

  return (
    <div className="root">
      <Box className="container">
        <Button
          variant="contained"
          className="button"
          onClick={() => handleDecreaseDepth()}
        >
          <KeyboardDoubleArrowLeftIcon className="icon" />
        </Button>

        <Button
          variant="contained"
          className="button"
          onClick={() => restDepth()}
        >
          <KeyboardArrowLeftIcon className="icon" />
        </Button>
        <Button
          variant="contained"
          className="button"
          onClick={() => addDepth()}
        >
          <KeyboardArrowRightIcon fontSize="small" className="icon" />
        </Button>
        <Button
          variant="contained"
          className="button"
          onClick={() => handleIncreaseDepth()}
        >
          <KeyboardDoubleArrowRightIcon className="icon" />
        </Button>
      </Box>
    </div>
  );
}

export default FloatingButton;
