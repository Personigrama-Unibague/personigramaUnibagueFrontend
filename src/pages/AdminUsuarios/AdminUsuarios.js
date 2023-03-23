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
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import IconButton from "material-ui/IconButton";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";

function createData(name, calories, fat) {
  return { name, calories, fat };
}

const rows = [
  createData(
    "Dirección y Planeación",
    "direccdeplaneacion@unibague.edu.co",
    6.0,
    24,
    4.0
  ),
  createData(
    "Maria Villamizar",
    "maria.villamizar@unibague.edu.co",
    2,
    37,
    4.3
  ),
  createData(
    "Julian Hernandez",
    "julian.hernandez@eunibague.edu.co  ",
    16.0,
    24,
    6.0
  ),
  createData(
    "Comunicación institucional",
    "comuinstitucional@unibague.edu.co",
    3.7,
    67,
    4.3
  ),
];

function AdminUsuarios() {
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
                Administar Usuarios
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
                  Usuario Registrados
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
                  Correo
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
                  Opciones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="center">{row.calories} </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      startIcon={
                        <BorderColorOutlinedIcon style={{ color: "white" }} />
                      }
                      style={{
                        backgroundColor: "#B8B9BA",
                        height: "25px",
                        width:"30%",
                        borderRadius:"10px"
                      }}
                    ></Button>
                    <Button
                      variant="outlined"
                      startIcon={
                        <DeleteOutlineOutlinedIcon style={{ color: "white" }} />
                      }
                      style={{
                        backgroundColor: "#B8B9BA",
                        height: "25px",
                        width:"30%",
                        borderRadius:"10px"
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
          startIcon={<PersonAddAltOutlinedIcon />}
          style={{
            backgroundColor: "#04B8E2",
            color: "white",
            marginTop: "30px",
            marginLeft: "240px",
          }}
        >
          Agregar Usuario
        </Button>
      </Grid>
    </Grid>
  );
}

export default AdminUsuarios;
