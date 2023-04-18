import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Grid } from "@material-ui/core";
import Typography from "@mui/material/Typography";
import InputOutlinedIcon from "@mui/icons-material/InputOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { Button } from "@material-ui/core";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import ChangeCircleOutlinedIcon from "@mui/icons-material/ChangeCircleOutlined";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import IconButton from "material-ui/IconButton";
import "./styles.css";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Dirección de planeación", 1, 6.0, 24, 4.0),
  createData("Secretaria General", 2, 2, 37, 4.3),
  createData("Dirección Financiera", 3, 16.0, 24, 6.0),
  createData("Relaciones internacionales", 4, 3.7, 67, 4.3),
  createData("Bienestar", 5, 16.0, 49, 3.9),
];

function AdminUnidades() {
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
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell className="tableCell" component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell
                    className="tableCell"
                    component="th"
                    scope="row"
                    align="center"
                  >
                    {row.calories}
                  </TableCell>
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
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
