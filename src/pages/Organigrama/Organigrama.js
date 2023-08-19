import React, { useEffect } from "react";
import Tree from "react-d3-tree";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";
import { getUnities } from "../../api/unidades";
import { useState } from "react";
import "./OrganigramaStyles.css";
import { FaUsers } from "react-icons/fa"; // Importa el ícono de grupo de personas

// Resto de tu código...

const containerStyles = {
  width: "1800px",
  height: "800px",
  background: "#eee",
};

export default function Organigrama() {
  const renderSVGNode = ({ nodeDatum, toggleNode }) => {
    const handleNodeClick = (nodeDatum, event) => {
      event.preventDefault();
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
        <rect
          className={nodeDatum.id === "X" ? "nodeParent" : "node"}
          x="-200"
          y="-45"
          width="400"
          height="90"
          rx="30"
          ry="30"
          fill={nodeDatum.id === "X" ? "#193f76" : "#02afd8"}
          onClick={(event) => {
            handleNodeClick(nodeDatum, event);
          }}
        />
        {nodeDatum.nombre && (
          <text
            className="name"
            x="0"
            y="0"
            textAnchor="middle"
            dy="0.3em"
            fontSize="16"
            fill={nodeDatum.id === "X" ? "white" : "black"}
          >
            {nodeDatum.nombre}
          </text>
        )}

        <Link
          to={`/personigrama/${nodeDatum.id}/${nodeDatum.nombre}`}
          style={{ textDecoration: "none" }}
        >
          <FaUsers style={{ color: "white" }} />
        </Link>

        {hasChildren && <path d="M10 7l5 5-5 5" />}
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

  const [translate, setTranslate] = useState({
    x: parseInt(localStorage.getItem("nodeX")),
    y: parseInt(localStorage.getItem("nodeY")),
  });

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
          initialDepth={localStorage.getItem("depth")}
          translate={translate}
          renderCustomNodeElement={renderSVGNode} // Cambio aquí
        />
      )}
    </div>
  );
}
