import React from "react";
import organigramas from "../organigrama.json";
import Tree from "react-d3-tree";
import { Button, IconButton } from "@material-ui/core";
import KeyboardDoubleArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { useCenteredTree } from "./helpers";
import NodeLabel from "./helpers";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { Link } from "react-router-dom";

const containerStyles = {
  width: "100vw",
  height: "100vh",
  background: "#eee",
};
const props = {
  prop1: "3.1.1",
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
      color: "white",
    },
    childId: {
      background: "#02AFD8",
      position: "",
      width: "300px",
      height: "70px",
      borderRadius: "30px",
      color: "white",
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
        className={`${nodeDatum.parent_id === null ? classes.button : classes.childId}`}
        variant="contained"
      >
        {nodeDatum.nombre !== undefined && (
          <div className={classes.name}>{nodeDatum.name}</div>
        )}
        {nodeDatum.nombre !== "" && <div>{nodeDatum.nombre}</div>}
        <IconButton>
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
        <IconButton>
          <ArrowForwardIosRoundedIcon
            style={{ color: "#FFFFFF" }}
            onClick={toggleNode}
          />
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

export default function Organigrama() {
  const classes = useStyles();
  const [translate, containerRef] = useCenteredTree();
  const nodeSize = { x: 500, y: 250 };
  const separation = { siblings: 1, nonSiblings: 2 };
  const foreignObjectProps = {
    width: nodeSize.x,
    height: nodeSize.y,
    x: -100,
    y: -40,
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
        NodeClassName="node__root"
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
