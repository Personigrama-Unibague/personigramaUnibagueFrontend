import React, { Component, useState, useEffect, useLayoutEffect } from "react";
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
import { getUnidades } from "../../api/unidades";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./styles.css";
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
import { render } from "@testing-library/react";
import axios from "axios";

export default function AdminUnidades() {
  const [unidades, setUnidades] = useState([]);

  useLayoutEffect(() => {
    (async () => {
      try {
        const und = await getUnidades();
        setUnidades(und.children);
      } catch (err) {
        console.log("Error API");
      }
    })();
  }, []);


  //Función para manejar el colapso de filas

  const [openRows, setOpenRows] = useState([]);

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
      <Grid item xs={12}>
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


      {unidades ? (
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
                    className="tableCellTitle"
                    style={{ backgroundColor: "#017A97", color: "white" }}
                  ></TableCell>
                  <TableCell
                    className="tableCellTitle"
                    style={{ backgroundColor: "#017A97", color: "white" }}
                  >
                    Unidad
                  </TableCell>
                  <TableCell
                    className="tableCellTitle"
                    align="center"
                    style={{ backgroundColor: "#017A97", color: "white" }}
                  >
                    Numero
                  </TableCell>
                  <TableCell
                    className="tableCellTitle"
                    align="center"
                    style={{ backgroundColor: "#017A97", color: "white" }}
                  >
                    Posición
                  </TableCell>
                  <TableCell
                    className="tableCellTitle"
                    align="center"
                    style={{ backgroundColor: "#017A97", color: "white" }}
                  >
                    Secciones
                  </TableCell>
                  <TableCell
                    className="tableCellTitle"
                    align="center"
                    style={{ backgroundColor: "#017A97", color: "white" }}
                  >
                    Funcionarios
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {unidades?.map((row) => (
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
                      <TableCell align="center">
                        {/* Flechas */}
                        <Grid container direction="row" spacing={0}>
                          {/* Icon Bajada */}
                          <Grid item xs={6} sm={6} md={6}>
                            <IconButton
                              className="IconButton"
                              variant="outlined"
                              style={{
                                backgroundColor: "#B8B9BA",

                                borderRadius: "10px",
                                color: "white",
                              }}
                            >
                              <KeyboardArrowUpOutlinedIcon
                                className="icon"
                                style={{ color: "white" }}
                              />
                            </IconButton>
                          </Grid>

                          {/* Icon Subida */}
                          <Grid item xs={6} sm={6} md={6}>
                            <IconButton
                              className="IconButton"
                              variant="outlined"
                              style={{
                                backgroundColor: "#B8B9BA",

                                borderRadius: "10px",
                                color: "white",
                              }}
                            >
                              <KeyboardArrowDownOutlinedIcon
                                className="icon"
                                style={{ color: "white" }}
                              />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          className="IconButton"
                          variant="outlined"
                          component={Link}
                          to="/confiSecciones"
                          style={{
                            backgroundColor: "#B8B9BA",
                            marginLeft: "10px",

                            borderRadius: "10px",
                            color: "white",
                          }}
                        >
                          <ListAltOutlinedIcon
                            className="icon"
                            style={{ color: "white" }}
                          />
                        </IconButton>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          className="IconButton"
                          variant="outlined"
                          component={Link}
                          to="/seccionFuncionarios"
                          style={{
                            backgroundColor: "#B8B9BA",
                            marginLeft: "10px",

                            borderRadius: "10px",
                            color: "white",
                          }}
                        >
                          <AssignmentIndOutlinedIcon
                            className="icon"
                            style={{ color: "white" }}
                          />
                        </IconButton>
                      </TableCell>
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
                                          onClick={() =>
                                            handleOpenRow(child.id)
                                          }
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
                                          {child.children.map(
                                            (grandChildren) => (
                                              <TableRow key={grandChildren.id}>
                                                <TableCell />
                                                <TableCell>
                                                  {grandChildren.nombre}
                                                </TableCell>
                                                <TableCell>
                                                  {grandChildren.id}
                                                </TableCell>
                                              </TableRow>
                                            )
                                          )}
                                        </Table>
                                      </Collapse>
                                    </TableCell>
                                    <TableCell align="center">
                                      {/* Flechas */}
                                      <Grid
                                        container
                                        direction="row"
                                        spacing={0}
                                      >
                                        {/* Icon Bajada */}
                                        <Grid item xs={6} sm={6} md={6}>
                                          <IconButton
                                            className="IconButton"
                                            variant="outlined"
                                            style={{
                                              backgroundColor: "#B8B9BA",

                                              borderRadius: "10px",
                                              color: "white",
                                            }}
                                          >
                                            <KeyboardArrowUpOutlinedIcon
                                              className="icon"
                                              style={{ color: "white" }}
                                            />
                                          </IconButton>
                                        </Grid>

                                        {/* Icon Subida */}
                                        <Grid item xs={6} sm={6} md={6}>
                                          <IconButton
                                            className="IconButton"
                                            variant="outlined"
                                            style={{
                                              backgroundColor: "#B8B9BA",

                                              borderRadius: "10px",
                                              color: "white",
                                            }}
                                          >
                                            <KeyboardArrowDownOutlinedIcon
                                              className="icon"
                                              style={{ color: "white" }}
                                            />
                                          </IconButton>
                                        </Grid>
                                      </Grid>
                                    </TableCell>
                                    <TableCell align="center">
                                      <IconButton
                                        className="IconButton"
                                        variant="outlined"
                                        component={Link}
                                        to="/confiSecciones"
                                        style={{
                                          backgroundColor: "#B8B9BA",
                                          marginLeft: "10px",

                                          borderRadius: "10px",
                                          color: "white",
                                        }}
                                      >
                                        <ListAltOutlinedIcon
                                          className="icon"
                                          style={{ color: "white" }}
                                        />
                                      </IconButton>
                                    </TableCell>
                                    <TableCell align="center">
                                      <IconButton
                                        className="IconButton"
                                        variant="outlined"
                                        component={Link}
                                        to="/seccionFuncionarios"
                                        style={{
                                          backgroundColor: "#B8B9BA",
                                          marginLeft: "10px",

                                          borderRadius: "10px",
                                          color: "white",
                                        }}
                                      >
                                        <AssignmentIndOutlinedIcon
                                          className="icon"
                                          style={{ color: "white" }}
                                        />
                                      </IconButton>
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
      {unidades.children.map((child, index) => (
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
      ) : (
        <h1>Cargando...</h1>
      )}
    </Grid>
  );
}
