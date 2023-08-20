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
  width: "100%",
  height: "100vh",
  background: "#eee",
};

export default function Organigrama() {
  const renderForeignObjectNode = ({ nodeDatum, toggleNode }) => {
    const handleNodeClick = (nodeDatum, event) => {
      // Evitar la recarga de la página al hacer clic
      event.preventDefault();
      // Lógica para obtener la profundidad del nodo clickeado
      const profundidad = calculateDepthById(
        unidades.children[1],
        nodeDatum.id
      );
      const prfundidadTotal = profundidad + 1;
      localStorage.setItem("depth", prfundidadTotal);
      console.log("Profundidad del nodo clickeado:", prfundidadTotal);

      const depth = parseInt(localStorage.getItem("depth"));
      const calculatedNodeX = calculateNodeX(depth);
      localStorage.setItem("nodeX", calculatedNodeX);
    };

    const hasChildren = nodeDatum.children && nodeDatum.children.length > 0;

    return (
      <g>
        {nodeDatum.id !== "X" ? (
          <svg
            width="400"
            height="85"
            x="-200" // Ajusta esta coordenada para que esté alineada con las líneas
            y="-45"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0" // Ajusta esta coordenada para que esté alineada con las líneas
              y="0"
              stroke="none"
              width="400"
              height="85"
              rx="30"
              ry="30"
              class={nodeDatum.id === "X" ? "nodeParent" : "node"}
              onClick={(event) => handleNodeClick(nodeDatum, event)}
              style={{
                fill: "#02afd8", // Color normal
                stroke: "none",
                transition: "fill 0.3s", // Agregar transición para suavizar el cambio de color
              }}
              onMouseOver={(event) => {
                event.target.style.fill = "#193f76"; // Cambiar el color al pasar el mouse
                event.target.nextSibling.style.fill = "#FFFFFF";
                event.target.nextSibling.style.stroke = "none";
              }}
              onMouseOut={(event) => {
                event.target.style.fill = "#02afd8"; // Restaurar el color original al salir del mouse
                event.target.nextSibling.style.fill = "black";
                event.target.nextSibling.style.stroke = "none";
              }}
            />
            <text
              x="35%"
              y="50%"
              fill="black"
              stroke="none"
              font-size="13"
              font-weight="180"
              text-anchor="middle"
              alignment-baseline="middle"
              textWrap="20"
              whiteSpace="pre-wrap"
            >
              {nodeDatum.nombre !== undefined &&
                nodeDatum.nombre !== "" &&
                nodeDatum.name}
              {nodeDatum.nombre !== "" && nodeDatum.nombre}
            </text>

            <a href={`/personigrama/${nodeDatum.id}/${nodeDatum.nombre}`}>
              <g transform="translate(350, 32.5)">
                <svg
                  viewBox="0 0 640 512"
                  fill="#FFFFFF"
                  height="1.5em"
                  width="1.5em"
                  x="-30"
                  y="0"
                >
                  <path d="M144 160c-44.2 0-80-35.8-80-80S99.8 0 144 0s80 35.8 80 80-35.8 80-80 80zm368 0c-44.2 0-80-35.8-80-80s35.8-80 80-80 80 35.8 80 80-35.8 80-80 80zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7-1.3 7.2-1.9 14.7-1.9 22.3 0 38.2 16.8 72.5 43.3 96H21.3C9.6 320 0 310.4 0 298.7zM405.3 320h-.7c26.6-23.5 43.3-57.8 43.3-96 0-7.6-.7-15-1.9-22.3 13.6-6.3 28.7-9.7 44.6-9.7h42.7c58.9 0 106.7 47.8 106.7 106.7 0 11.8-9.6 21.3-21.3 21.3H405.3zm10.7-96c0 53-43 96-96 96s-96-43-96-96 43-96 96-96 96 43 96 96zM128 485.3c0-73.6 59.7-133.3 133.3-133.3h117.4c73.6 0 133.3 59.7 133.3 133.3 0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z" />
                </svg>
              </g>
            </a>

            {hasChildren && (
              <g transform="translate(370, 32.5)">
                <svg
                  stroke="#FFFFFF"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  fill="none"
                  height="1.5em"
                  width="1.5em"
                  x="-10"
                  y="0"
                  onClick={toggleNode}
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <path d="M3 5v14l8-7zM14 5v14l8-7z" />
                </svg>
              </g>
            )}
          </svg>
        ) : (
          <svg
            width="400"
            height="85"
            x="-200" // Ajusta esta coordenada para que esté alineada con las líneas
            y="-45"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0"
              y="0"
              width="400"
              height="85"
              rx="30"
              ry="30"
              stroke="none"
              class={nodeDatum.id === "X" ? "nodeParent" : "node"}
              style={{
                fill: "#193f76", // Color normal
                stroke: "none",
                transition: "fill 0.3s", // Agregar transición para suavizar el cambio de color
              }}
              onMouseOver={(event) => {
                event.target.style.fill = "#02afd8"; // Cambiar el color al pasar el mouse
                event.target.nextSibling.style.fill = "black";
                event.target.nextSibling.style.stroke = "none";
              }}
              onMouseOut={(event) => {
                event.target.style.fill = "#193f76"; // Restaurar el color original al salir del mouse
                event.target.nextSibling.style.fill = "#FFFFFF";
                event.target.nextSibling.style.stroke = "none";
              }}
            />

            <text
              x="50%"
              y="50%"
              fill="#FFFFFF"
              stroke="none"
              font-size="15"
              font-weight="200"
              text-anchor="middle"
              alignment-baseline="middle"
            >
              {nodeDatum.nombre !== undefined &&
                nodeDatum.nombre !== "" &&
                nodeDatum.name}
              {nodeDatum.nombre !== "" && nodeDatum.nombre}
            </text>
          </svg>
        )}
      </g>
    );
  };

  if (parseInt(localStorage.getItem("depth")) === 1) {
    localStorage.setItem("nodeX", 100);
    localStorage.setItem("nodeY", 320);
  }

  const calculateNodeX = (depth) => {
    const initialX = 100;
    const subtractionAmount = 240;
    return initialX - subtractionAmount * (depth - 1);
  };
  const [isSafari, setIsSafari] = useState(false); // Add state for Safari detection

  const [translate, setTranslate] = useState({
    x: parseInt(localStorage.getItem("nodeX")),
    y: parseInt(localStorage.getItem("nodeY")),
  });
  useEffect(() => {
    // Detect if Safari is being used
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    setIsSafari(isSafari);
  }, []);

  useEffect(() => {
    setTranslate({
      x: parseInt(localStorage.getItem("nodeX")),
      y: parseInt(localStorage.getItem("nodeY")),
    });
    console.log(translate);
  }, []);

  const [unidades, setUnidades] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Nuevo estado isLoading

  const calculateDepthById = (rootNode, nodeIdToFind) => {
    const findDepth = (node, targetId, depth) => {
      if (node.id === targetId) {
        return depth;
      }

      if (node.children) {
        for (const child of node.children) {
          const foundDepth = findDepth(child, targetId, depth + 1);
          if (foundDepth !== -1) {
            return foundDepth;
          }
        }
      }

      return -1;
    };

    if (!rootNode || !rootNode.children) {
      console.error("El árbol no tiene un nodo raíz válido.");
      return -1;
    }

    return findDepth(rootNode, nodeIdToFind, 0);
  };

  if (parseInt(localStorage.getItem("depth")) === 0) {
    localStorage.setItem("depth", 1);
    setTimeout(window.location.reload(), 10000);
  }

  const nodeSize = { x: 500, y: 130 };
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
        // Clona los datos para no modificar el estado original
        const clonedData = JSON.parse(JSON.stringify(und));
        // Ordena los hijos de la raíz alfabéticamente
        sortChildrenAlphabetically(clonedData);
        setUnidades(clonedData);
      } catch (err) {
        window.alert("Error API");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {}, [unidades]);

  const calculateTotalLevels = (data) => {
    // Si no hay datos o es un array vacío, el total de niveles es 0
    if (!data || data.length === 0) {
      return 0;
    }

    // Función auxiliar para recorrer los nodos y obtener su profundidad
    const getDepth = (node) => {
      if (!node.children || node.children.length === 0) {
        return 1;
      }
      const depths = node.children.map(getDepth);
      return 1 + Math.max(...depths);
    };

    // Obtenemos la profundidad máxima desde la raíz del árbol
    const depthsFromRoot = data.children.map(getDepth);
    const totalLevels = Math.max(...depthsFromRoot);

    return totalLevels;
  };

  const totalNiveles = calculateTotalLevels(unidades);
  localStorage.setItem("niveles", parseInt(totalNiveles));

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
            depthFactor={isSafari ? 630 : 650} // Ajustar el factor de profundidad según si es Safari o no
            transitionDuration={1}
            pathFunc="step"
            NodeClassName="node__root"
            branchNodeClassName="node__branch"
            leafNodeClassName="node__leaf"
            renderCustomNodeElement={(rd3tProps) =>
              renderForeignObjectNode({
                ...rd3tProps,
                foreignObjectProps,
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
