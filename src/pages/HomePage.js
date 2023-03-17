import React from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import _ from "lodash";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDrag, useDrop } from "react-dnd";
import organization from "../org.json";
import organizationJson from "../organization.json";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";

import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "white",
    display: "inline-flex",
    borderRadius: 16,
    color: "white",
  },
  expand: {
    transform: "rotate(270deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.short,
    }),
  },
  expandOpen: {
    transform: "rotate(90deg)",
  },
  first: {
    background: "#193F76",
  },
  second: {
    background: "#02AFD8",
  },
  tertiary: {
    background: "#039EC2",
  },
}));

let first = "#193F76";
let secondary = "#02AFD8";
let tertiary = "#039EC2";

function Organization({ org, onCollapse, collapsed }) {
  const classes = useStyles();

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: "area",
    drop: () => ({ name: org.tradingName }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = canDrop && isOver;

  let backgroundColor = "white";

  if (isActive) {
    backgroundColor = "#ddffd2";
  } else if (canDrop) {
    backgroundColor = "#ffeedc";
  }

  return (
    <Card
      variant="outlined"
      className={classes.root}
      style={{ backgroundColor: first }}
    >
      <CardHeader
        classes={classes.text}
        title={org.tradingName}
        disableTypography
      />

      {/* Personigrama Area */}
      <IconButton size="small" style={{ color: "white" }}>
        <GroupOutlinedIcon />
      </IconButton>

      {/* Boton Desplegable */}
      <IconButton
        size="small"
        onClick={onCollapse}
        className={clsx(classes.expand, {
          [classes.expandOpen]: !collapsed,
        })}
        style={{ color: "white" }}
      >
        <ExpandMoreIcon />
      </IconButton>
    </Card>
  );
}

function Account({ a }) {
  const classes = useStyles();

  return (
    <Card
      variant="outlined"
      className={classes.root}
      style={{ cursor: "pointer", backgroundColor: secondary }}
    >
      <CardHeader title={a.name} disableTypography />

      <IconButton size="small" style={{ color: "white" }}>
        <GroupOutlinedIcon />
      </IconButton>

      {/* Boton Desplegable */}
      <IconButton size="small" style={{ color: "white" }}>
        <ExpandMoreIcon />
      </IconButton>
    </Card>
  );
}

function Product({ p }) {
  const classes = useStyles();
  return (
    <Card
      variant="outlined"
      className={classes.root}
      style={{ backgroundColor: tertiary }}
    >
      <CardContent>
        <Typography variant="subtitle2">{p.name}</Typography>
      </CardContent>
    </Card>
  );
}
function Node({ o, parent }) {
  const [collapsed, setCollapsed] = React.useState(o.collapsed);
  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };
  React.useEffect(() => {
    o.collapsed = collapsed;
  });
  const T = parent
    ? TreeNode
    : (props) => (
        <Tree
          {...props}
          lineWidth={"2px"}
          lineColor={"#bbc"}
          lineBorderRadius={"12px"}
        >
          {props.children}
        </Tree>
      );
  return collapsed ? (
    <T
      label={
        <Organization
          org={o}
          onCollapse={handleCollapse}
          collapsed={collapsed}
        />
      }
    />
  ) : (
    <T
      label={
        <Organization
          org={o}
          onCollapse={handleCollapse}
          collapsed={collapsed}
        />
      }
    >
      {_.map(o.account, (a) => (
        <TreeNode label={<Account a={a} />}>
          <TreeNode label={<Product p={a.product} />} />
        </TreeNode>
      ))}
      {_.map(o.organizationChildRelationship, (c) => (
        <Node o={c} parent={o} />
      ))}
    </T>
  );
}
const theme = createMuiTheme({
  palette: {
    background: "#ECECF4",
  },
  fontFamily: "Roboto, sans-serif",
});

export default function App(props) {
  return (
    <ThemeProvider theme={theme}>
      <Box bgcolor="background" padding={4} height="100vh">
        <DndProvider backend={HTML5Backend}>
          <Node o={organization} />
        </DndProvider>
      </Box>
    </ThemeProvider>
  );
}
