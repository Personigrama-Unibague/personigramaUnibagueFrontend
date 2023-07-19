import React, { useEffect } from "react";
import Tree from "react-d3-tree";
import CircularProgress from "@mui/material/CircularProgress";

import { Button, IconButton } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { useCenteredTree } from "./helpers";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { Link } from "react-router-dom";
import { getUnities } from "../api/unidades";
import { useState } from "react";
import FloatingButton from "../components/FloatingButton/FloatingButton";

const containerStyles = {
  width: "100vw",
  height: "100vh",
  background: "#eee",
};

const useStyles = makeStyles(
  createStyles({
    button: {
      position: "",
      width: "300px",
      height: "70px",
      borderRadius: "30px",
      background: "#193F76",
      color: "white",
    },
    name: {
      fontSize: "16px",
      paddingRight: "5px !important",
    },
    edit: {
      position: "",
      top: "0px",
      right: "0px !important",
      padding: "4px !important",
      color: "#4BA083",
    },
    attributes: {
      position: "",
      bottom: "5px",
      right: "0px !important",
      color: "white",
    },
    childId: {
      background: "#02AFD8",
      position: "",
      width: "400px",
      height: "110px",
      borderRadius: "30px",
      color: "white",
      fontSize: "15px",
    },
    ArrowButton: {
      padding: "8px !important",
    },
  })
);

const renderForeignObjectNode = ({
  nodeDatum,
  toggleNode,
  foreignObjectProps,
  classes,
}) => (
  <>
    {/* `foreignObject` requires width & height to be explicitly set. */}
    <foreignObject {...foreignObjectProps}>
      <Button
        className={`${
          nodeDatum.parent_id === null ? classes.button : classes.childId
        }`}
        variant="contained"
      >
        {nodeDatum.nombre !== undefined && (
          <div className={classes.name}>{nodeDatum.name}</div>
        )}
        {nodeDatum.nombre !== "" && <div>{nodeDatum.nombre}</div>}
        <IconButton className={classes.ArrowButton}>
          <ArrowBackIosOutlinedIcon
            style={{ color: "#FFFFFF" }}
            onClick={toggleNode}
          />
        </IconButton>
        <Link to={`/personigrama/${nodeDatum.id}/${nodeDatum.nombre}`}>
          <IconButton className={classes.edit} aria-label="edit">
            <GroupRoundedIcon style={{ color: "#FFFFFF" }} />
          </IconButton>
        </Link>
        <IconButton className={classes.ArrowButton}>
          <ArrowForwardIosRoundedIcon
            style={{ color: "#FFFFFF" }}
            onClick={toggleNode}
          />
        </IconButton>
      </Button>
    </foreignObject>
  </>
);

export default function Organigrama() {
  const classes = useStyles();
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [unidades, setUnidades] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Nuevo estado isLoading
  if( parseInt(localStorage.getItem("depth")) == 0 ){
    localStorage.setItem("depth", 1);
    setTimeout(window.location.reload(), 10000);
  }
  const nodeSize = { x: 500, y: 250 };
  const separation = { siblings: 1, nonSiblings: 2 };
  const foreignObjectProps = {
    width: nodeSize.x,
    height: nodeSize.y,
    x: -100,
    y: -50,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const und = await getUnities();
        setUnidades(und);
      } catch (err) {
        window.alert("Error API");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {}, [unidades]);

   useEffect(() => {
    setTranslate({ x: 100, y: 350 }); // Ejemplo de valor para translate
  }, [unidades]);

  return (
    <div style={containerStyles}>
      {isLoading ? ( // Verificar si los datos están cargando
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <p style={{ color: "#193F76", fontSize: "50px" }}>
            Cargando unidades...
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress size="90px" />
          </div>
        </div>
      ) : (
        <>
          <FloatingButton />
          <Tree
            data={unidades}
            nodeSize={nodeSize}
            separation={separation}
            depthFactor={650}
            transitionDuration={1}
            pathFunc="step"
            NodeClassName="node__root"
            branchNodeClassName="node__branch"
            leafNodeClassName="node__leaf"
            renderCustomNodeElement={(rd3tProps) =>
              renderForeignObjectNode({
                ...rd3tProps,
                foreignObjectProps,
                classes,
              })
            }
            orientation="horizontal"
            initialDepth={localStorage.getItem("depth")}
            translate={translate}
          />
        </>
      )}
    </div>
  );
}
