import React from "react";
import organigramas from "../organigrama.json";
import Tree from "react-d3-tree";
import { Button, IconButton } from "@material-ui/core";
import { Edit, AttachMoney, Accessible } from "@material-ui/icons";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { useCenteredTree } from "./helpers";
import NodeLabel from "./helpers";

const containerStyles = {
  width: "100vw",
  height: "100vh",
  background: "#eee",
};

const useStyles = makeStyles(
  createStyles({
    button: {
      position: "",
      width: "250px",
      height: "80px",
      background: "#193F76",
      color: "white",
    },
    name: {
      fontSize: "16px",
    },
    edit: {
      position: "",
      top: "0px",
      right: "0px",
      color: "#4BA083",
    },
    attributes: {
      position: "",
      bottom: "5px",
      right: "10px",
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
        className={classes.button}
        variant="contained"
        onClick={toggleNode}
      >
        <div className={classes.name}>{nodeDatum.name}</div>
        {/* {nodeDatum.attributes.nombre} */}
        <div>Nombre:</div>
        <div>{nodeDatum.nombre}</div>
        <IconButton className={classes.edit} aria-label="edit">
          <AttachMoney style={{ color: "#459C7F" }} />
          <Accessible style={{ color: "#459C7F" }} />
        </IconButton>
      </Button>
    </foreignObject>
  </>
);

/* Json Jerarquico */
function createTree(organigrama, id) {
  var node = {};
  organigrama.filter((obj) => obj.id === id).forEach((obj) => (node = obj));
  var childrenIds = organigrama
    .filter((obj) => obj.parent_id === id)
    .map((obj) => obj.id);
  node.children = childrenIds.map((childId) =>
    createTree(organigrama, childId)
  );
  return node;
}

export default function PruebasJson() {
  const classes = useStyles();
  const [translate, containerRef] = useCenteredTree();
  const nodeSize = { x: 300, y: 250 };
  const separation = { siblings: 1, nonSiblings: 2 };
  const foreignObjectProps = {
    width: nodeSize.x,
    height: nodeSize.y,
    x: -125,
    y: -80,
  };

  let json = createTree(organigramas, null);
  let jsonFianl = JSON.stringify(json);
  console.log(jsonFianl);

  return (
    <div style={containerStyles}>
      <Tree
        data={json}
        nodeSize={nodeSize}
        separation={separation}
        transitionDuration="1000"
        pathFunc="step"
        rootNodeClassName="node__root"
        branchNodeClassName="node__branch"
        leafNodeClassName="node__leaf"
        renderCustomNodeElement={(rd3tProps) =>
          renderForeignObjectNode({ ...rd3tProps, foreignObjectProps, classes })
        }
        orientation="horizontal"
      />
    </div>
  );
}
