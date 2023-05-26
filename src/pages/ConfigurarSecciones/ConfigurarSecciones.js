import React, { Component, useState, useEffect, useLayoutEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Dialog, Grid, Select, TextField } from "@material-ui/core";
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
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import IconButton from "material-ui/IconButton";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useParams } from "react-router-dom";
import { getAllRolesByUnidad } from "../../api/roles";
import { List, ListItem } from "material-ui";

export default function ConfigurarSecciones() {
  let params = useParams();

  const [roles, setRoles] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [nextPriority, setNextPriority] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useLayoutEffect(() => {
    (async () => {
      try {
        const getRolesByUnidad = await getAllRolesByUnidad(params.unidad);
        setRoles(getRolesByUnidad);
        setNextPriority(getRolesByUnidad.length + 1);
      } catch (err) {
        console.log("Error API");
      }
    })();
  }, []);

  const agregarSeccion = (id) => {
    console.log("hola");
  };

  const handleChange = async (event) => {
    //setFuncionario(event.target.value);
    //const user = await findPersonaById(event.target.value);
    //console.log(user);
    //getAgregarPersona(user, unidad);
    //setTimeout(window.location.reload(), 10000);
  };

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClicked = () => {
    console.log("Valor del input deshabilitado: 4");
    console.log("Valor del input editable:", inputValue);
  };

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
      <Grid>
        <Grid item style={{ marginTop: "95px", marginRight: "100px" }}>
          <IconButton
            onClick={handleOpen}
            style={{
              backgroundColor: "#1B5DA7",
              color: "white",
            }}
          >
            <AddIcon fontSize="large" />
          </IconButton>
          <a>Agregar Seccion</a>
        </Grid>

        <Grid item style={{ marginTop: "10px" }}>
          <IconButton
            style={{
              backgroundColor: "#1B5DA7",
              color: "white",
            }}
          >
            <DeleteIcon fontSize="large" />
          </IconButton>
          <a>Eliminar Seccion</a>
        </Grid>
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
                  {params.nombre}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roles?.map((rol) => (
                <TableRow key={rol.id}>
                  <TableCell
                    component="th"
                    scope="rol"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    {rol.nombre}
                  </TableCell>
                  <TableCell align="center">
                    {rol.id_jerar}
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
                      <BorderColorOutlinedIcon
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
          startIcon={<SaveIcon />}
          style={{
            backgroundColor: "#04B8E2",
            color: "white",
            marginTop: "30px",
            marginLeft: "30px",
            borderRadius: "50px",
          }}
        >
          Guardar
        </Button>

        {/* agregar Seccion */}
        <Dialog open={open} onClose={handleClose}>
          <List sx={{ pt: 0 }}>
            <div className="modalTitle">
              <div className="typpgraphyTitle">Agregar Seccion</div>
            </div>
            <ListItem style={{ paddingTop: "30px" }}>
              <Grid container spacing={2}>
                <Grid
                  item
                  md={2}
                  style={{
                    borderColor: "#04B8E2",
                  }}
                >
                  <TextField
                    disabled
                    label="Prioridad"
                    value={nextPriority}
                    style={{ width: "200px" }}
                    fullWidth
                  />
                </Grid>

                <Grid item md={10}>
                  <TextField
                    className="textField"
                    label="Nombre de la unidad"
                    placeholder="Unidad"
                    value={inputValue}
                    onChange={handleInputChange}
                    focused
                    style={{
                      borderRadius: "5px",
                    }}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </ListItem>

            {/* Boton */}
            <Button
              variant="contained"
              color="primary"
              onClick={handleButtonClicked}
            >
              Obtener información
            </Button>
          </List>
        </Dialog>
      </Grid>
    </Grid>
  );
}
