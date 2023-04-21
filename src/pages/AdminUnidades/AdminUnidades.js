import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Grid } from "@material-ui/core";
import InputOutlinedIcon from "@mui/icons-material/InputOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import { Button } from "@material-ui/core";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import ChangeCircleOutlinedIcon from "@mui/icons-material/ChangeCircleOutlined";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./styles.css";
import organigramas from "../../organigramaFormat.json";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Collapse,
  Typography,
} from "@material-ui/core";
import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";

function AdminUnidades() {
  const [openRows, setOpenRows] = useState([]);

  // Función para manejar el colapso de filas
  const handleOpenRow = (id) => {
    if (openRows.includes(id)) {
      setOpenRows(openRows.filter((rowId) => rowId !== id));
    } else {
      setOpenRows([...openRows, id]);
    }
  };

  return (
    <Grid
      container
      component="main"
      style={{ justifyContent: "center", display: "flex" }}
    >
      {/* Toolbar */}
      <Grid xs={12}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar style={{ backgroundColor: "#193F76" }}>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
                style={{
                  justifyContent: "center",
                  display: "flex",
                  font: "Lato",
                  fontSize: "15px",
                }}
              >
                Administar Unidades
              </Typography>
              <InputOutlinedIcon
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 3 }}
              >
                <MenuIcon />
              </InputOutlinedIcon>
            </Toolbar>
          </AppBar>
        </Box>
      </Grid>

      {/* Grid Table */}
      <Grid item style={{ marginTop: "50px" }}>
        {/* Table */}
        <TableContainer
          component={Paper}
          style={{ borderRadius: "10px 10px 0px 0px" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    backgroundColor: "#017A97",
                  }}
                />
                <TableCell
                  className="tableCellTitle"
                  style={{
                    backgroundColor: "#017A97",
                    color: "white",
                    width: "650px",
                  }}
                >
                  Unidad
                </TableCell>
                <TableCell
                  className="tableCellTitle"
                  align="center"
                  style={{ backgroundColor: "#017A97", color: "white" }}
                >
                  Posición
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {organigramas.children.map((row) => (
                <React.Fragment key={row.id}>
                  <TableRow>
                    <TableCell>
                      {row.children && (
                        <IconButton
                          size="small"
                          onClick={() => handleOpenRow(row.id)}
                        >
                          {openRows.includes(row.id) ? (
                            <KeyboardArrowUp />
                          ) : (
                            <KeyboardArrowDown />
                          )}
                        </IconButton>
                      )}
                    </TableCell>
                    <TableCell>{row.nombre}</TableCell>
                    <TableCell>{row.id}</TableCell>
                  </TableRow>
                  {row.nombre && (
                    <TableRow>
                      <TableCell
                        style={{ paddingBottom: 0, paddingTop: 0 }}
                        colSpan={3}
                      >
                        <Collapse
                          in={openRows.includes(row.id)}
                          timeout="auto"
                          unmountOnExit
                        >
                          <Table size="small">
                            <TableBody>
                              {row.children.map((child) => (
                                <TableRow key={child.id}>
                                  <TableCell>
                                    {child.children && (
                                      <IconButton
                                        size="small"
                                        onClick={() => handleOpenRow(child.id)}
                                      >
                                        {openRows.includes(child.id) ? (
                                          <KeyboardArrowUp />
                                        ) : (
                                          <KeyboardArrowDown />
                                        )}
                                      </IconButton>
                                    )}
                                  </TableCell>
                                  <TableCell>{child.nombre}</TableCell>
                                  <TableCell>{child.id}</TableCell>

                                  <TableCell
                                    style={{
                                      paddingBottom: 0,
                                      paddingTop: 0,
                                    }}
                                    colSpan={3}
                                  >
                                    <Collapse
                                      in={openRows.includes(child.id)}
                                      timeout="auto"
                                      unmountOnExit
                                    >
                                      <Table size="small">
                                        {child.children.map((grandChildren) => (
                                          <TableRow key={grandChildren.id}>
                                            <TableCell />
                                            <TableCell>
                                              {grandChildren.nombre}
                                            </TableCell>
                                            <TableCell>
                                              {grandChildren.id}
                                            </TableCell>
                                          </TableRow>
                                        ))}
                                      </Table>
                                    </Collapse>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/*  <div>
          <ul>
            {organigramas.children.map((child, index) => (
              <li key={index}>
                <h4>{child.nombre}</h4>
                <p>ID: {child.id}</p>
                {child.children && (
                  <ul>
                    {child.children.map((grandchild, index) => (
                      <li key={index}>
                        <h5>{grandchild.nombre}</h5>
                        <p>ID: {grandchild.id}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div> */}
        {/* User Button */}

        {/* Actualizar Button */}
        <Button
          variant="outlined"
          startIcon={<ChangeCircleOutlinedIcon />}
          style={{
            backgroundColor: "#04B8E2",
            color: "white",
            marginTop: "30px",
            marginLeft: "13vw",
            borderRadius: "30px",
          }}
        >
          Actualizar
        </Button>
      </Grid>
    </Grid>
  );
}

export default AdminUnidades;
