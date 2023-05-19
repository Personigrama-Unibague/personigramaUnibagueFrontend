import React, { Component, useState, useEffect, useLayoutEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Grid } from "@material-ui/core";
import Typography from "@mui/material/Typography";
import InputOutlinedIcon from "@mui/icons-material/InputOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@material-ui/core";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import SaveIcon from "@mui/icons-material/Save";
import IconButton from "material-ui/IconButton";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Dialog, ListItem } from "material-ui";
import List from "@mui/material/List";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import TextField from "material-ui/TextField";
import "./styles.css";
import {
  getFuncionarios,
  getFuncionariosByUnidad,
  getAgregarPersona,
  findPersonaById,
} from "../../api/funcionarios";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

function SeccionFuncionarios() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [funcionarios, setFuncionarios] = useState([]);
  const [funcionariosCompletos, setFuncionariosCompletos] = useState([]);
  const [funcionario, setFuncionario] = React.useState("");
  const [unidad, setUnidad] = React.useState("");

  const handleChange = async (event) => {
    setFuncionario(event.target.value);
    const user = await findPersonaById(event.target.value);
    getAgregarPersona(user, unidad);
    const timeout = setTimeout(window.location.reload(), 10000);
  };

  let params = useParams();

  /*  agregarFuncionario =  () => {
    const agregar = await getAgregarPersona(funcionario);
   
  }; */

  useLayoutEffect(() => {
    (async () => {
      try {
        const func = await getFuncionarios();
        const prueba = await getFuncionariosByUnidad(params.unidad);
        setFuncionarios(prueba);
        setFuncionariosCompletos(func);
        setUnidad(params.unidad);
        console.log(funcionarios);
      } catch (err) {
        console.log("Error API");
      }
    })();
  }, []);

  return (
    <Grid
      container
      component="main"
      style={{ justifyContent: "center", display: "flex" }}
    >
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
                  fontSize: "38px",
                }}
              >
                Sección Funcionarios
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
                    textAlign: "center"
                  }}
                  colSpan="3"
                >
                  {params.nombre}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {funcionarios.map((row) => (
                <TableRow key={row.nombre}>
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    {params.unidad}
                  </TableCell>
                  <TableCell align="center">{row.nombre}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      className="IconButton"
                      variant="outlined"
                      style={{
                        backgroundColor: "#B8B9BA",
                        borderRadius: "10px",
                        color: "white",
                        marginLeft: "5px",
                      }}
                    >
                      <DeleteOutlineOutlinedIcon
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

        <Button
          variant="outlined"
          onClick={handleOpen}
          startIcon={<PersonAddAltIcon />}
          style={{
            backgroundColor: "#04B8E2",
            color: "white",
            marginTop: "30px",
            marginLeft: "5px",
            borderRadius: "50px",
          }}
        >
          Agregar funcionario
        </Button>
        {/*Modal Agregar funcionario */}
        <Dialog open={open} onClose={handleClose}>
          <List sx={{ pt: 0 }}>
            <div className="modalTitle">
              <div className="typpgraphyTitle">Agregar Funcionario</div>
            </div>
            <ListItem style={{ paddingTop: "30px", width: "450px" }}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={funcionario}
                label="Funcionarios"
                onChange={handleChange}
                className="textField"
                placeholder="Funcionario"
                focused
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "30px",
                  borderColor: "#04B8E2",
                }}
              >
                {funcionariosCompletos.map((option) => (
                  <MenuItem key={option.nombre} value={option.cedula}>
                    {option.nombre}
                  </MenuItem>
                ))}
              </Select>
            </ListItem>
          </List>
        </Dialog>
      </Grid>
    </Grid>
  );
}

export default SeccionFuncionarios;
