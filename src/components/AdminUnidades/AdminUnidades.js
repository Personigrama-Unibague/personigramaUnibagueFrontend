import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Grid } from "@material-ui/core";
import Typography from "@mui/material/Typography";
import InputOutlinedIcon from "@mui/icons-material/InputOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { fontSize } from "@mui/system";
import { Button } from "@material-ui/core";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import ChangeCircleOutlinedIcon from "@mui/icons-material/ChangeCircleOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import IconButton from "material-ui/IconButton";

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
                  fontSize: "38px",
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

      <Grid item style={{ marginTop: "50px" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }}>
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    backgroundColor: "#017A97",
                    font: "Lato",
                    color: "white",
                    fontSize: "20px",
                  }}
                >
                  Unidad
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#017A97",
                    color: "white",
                    font: "Lato",
                    fontSize: "20px",
                  }}
                  align="center"
                >
                  Posición
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#017A97",
                    color: "white",
                    font: "Lato",
                    fontSize: "20px",
                  }}
                  align="center"
                >
                  Secciones
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#017A97",
                    color: "white",
                    font: "Lato",
                    fontSize: "20px",
                  }}
                  align="center"
                >
                  Funcionarios
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="center">
                    {row.calories}{" "}
                    <Button
                      variant="outlined"
                      startIcon={
                        <KeyboardArrowUpOutlinedIcon
                          style={{ color: "white" }}
                        />
                      }
                      style={{
                        backgroundColor: "#B8B9BA",
                        height: "25px",
                        width: "30%",
                        borderRadius: "10px",
                      }}
                    ></Button>
                    <Button
                      variant="outlined"
                      startIcon={
                        <KeyboardArrowDownOutlinedIcon
                          style={{ color: "white" }}
                        />
                      }
                      style={{
                        backgroundColor: "#B8B9BA",
                        height: "25px",
                        width: "30%",
                        borderRadius: "10px",
                      }}
                    ></Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      startIcon={
                        <ListAltOutlinedIcon style={{ color: "white" }} />
                      }
                      style={{
                        backgroundColor: "#B8B9BA",
                        height: "25px",
                        width: "30%",
                        borderRadius: "10px",
                      }}
                    ></Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      startIcon={
                        <AssignmentIndOutlinedIcon style={{ color: "white" }} />
                      }
                      style={{
                        backgroundColor: "#B8B9BA",
                        height: "25px",
                        width: "30%",
                        borderRadius: "10px",
                      }}
                    ></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <IconButton
          style={{
            backgroundColor: "#1B5DA7",
            color: "white",
            marginTop: "80px",
          }}
        >
          <AccountCircleOutlinedIcon fontSize="large" />
        </IconButton>
        <Button
          variant="outlined"
          startIcon={<ChangeCircleOutlinedIcon />}
          style={{
            backgroundColor: "#04B8E2",
            color: "white",
            marginTop: "30px",
            marginLeft: "240px",
          }}
        >
          Actualizar
        </Button>
      </Grid>
    </Grid>
  );
}

export default AdminUnidades;
