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
import { fontSize, style } from "@mui/system";
import { Button } from "@material-ui/core";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import SaveIcon from "@mui/icons-material/Save";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import IconButton from "material-ui/IconButton";

function createData(name, calories) {
  return { name, calories };
}

const rows = [
  createData(1, "-"),
  createData(2, "A"),
  createData(3, "B"),
  createData(4, "C"),
];

function ConfigurarSecciones() {
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
                Configuración Secciones
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
          <Table
            sx={{ minWidth: 200 }}
            style={{ borderStyle: "solid", borderColor: "#017A97" }}
          >
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    backgroundColor: "#017A97",
                    font: "Lato",
                    color: "white",
                    fontSize: "20px",
                  }}
                  colspan="2"
                >
                  Centro de idiomas
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    {row.name}
                  </TableCell>
                  <TableCell align="center">
                    {row.calories}
                    <Button
                      variant="outlined"
                      startIcon={
                        <BorderColorOutlinedIcon
                          style={{ color: "white", fontSize: "large" }}
                        />
                      }
                      style={{
                        backgroundColor: "#B8B9BA",
                        marginLeft: "10px",
                        height: "20px",
                        width: "10px",
                        borderRadius: "10px",
                      }}
                    ></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Button
          variant="outlined"
          startIcon={<SaveIcon />}
          style={{
            backgroundColor: "#04B8E2",
            color: "white",
            marginTop: "30px",
            marginLeft: "30px",
          }}
        >
          Guardar
        </Button>
      </Grid>
    </Grid>
  );
}

export default ConfigurarSecciones;
