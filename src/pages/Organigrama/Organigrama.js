import React, { useEffect, useRef } from "react";
import Tree from "react-d3-tree";
import CircularProgress from "@mui/material/CircularProgress";
import { Button, IconButton } from "@mui/material";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import { getUnities } from "../../api/unidades";
import { useState } from "react";
import FloatingButton from "../../components/FloatingButton/FloatingButton";
import "./OrganigramaStyles.css";

const containerStyles = {
  width: "1800px",
  height: "800px",
  background: "#eee",
};

export default function Organigrama() {
  /* CONST */
  const [unidades, setUnidades] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
 /*  const totalNiveles = calculateTotalLevels(unidades); */
 const nodeSize = { x: 500, y: 130 };
 const separation = { siblings: 1, nonSiblings: 2 };
 const foreignObjectProps = {
   width: nodeSize.x,
   height: nodeSize.y,
   x: -100,
   y: -50,
 };

  const sortChildrenAlphabetically = (node) => {
    if (node.children) {
      node.children.sort((a, b) => a.nombre.localeCompare(b.nombre));
      node.children.forEach(sortChildrenAlphabetically);
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const und = await getUnities();
        const clonedData = JSON.parse(JSON.stringify(und));
        //TODO DESCOMENTAR
        //sortChildrenAlphabetically(clonedData);
        setUnidades(clonedData);
      } catch (err) {
        window.alert("Error API");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => { }, [unidades]);

  
  return (
    <div style={containerStyles}>
      {isLoading ? (
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
        <Tree
          data={unidades}
          nodeSize={nodeSize}
          separation={separation}
          depthFactor={650}
          transitionDuration={1}
          pathFunc="step"
          rootNodeClassName="node__root"
          branchNodeClassName="node__branch"
          leafNodeClassName="node__leaf"
          orientation="horizontal"
        />
      )}
    </div>
  );
}
