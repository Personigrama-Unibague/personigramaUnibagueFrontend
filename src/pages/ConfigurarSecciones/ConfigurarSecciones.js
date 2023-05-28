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
import {
  deleteRolById,
  getAllRolesByUnidad,
  saveRol,
  updateNameById,
} from "../../api/roles";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import { List, ListItem } from "material-ui";
import "./styles.css";

export default function ConfigurarSecciones() {
  let params = useParams();

  const [roles, setRoles] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [nextPriority, setNextPriority] = useState([]);
  const [nameParametersDialog, setNameParametersDialog] = React.useState();
  const [idParametersDialog, setIdParametersDialog] = React.useState();
  const [newRolName, setNewRolName] = React.useState();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenUpdate = () => setOpenUpdate(true);
  const handleCloseUpdate = () => setOpenUpdate(false);
  const [inputValue, setInputValue] = useState("");

  useLayoutEffect(() => {
    (async () => {
      try {
        const getRolesByUnidad = await getAllRolesByUnidad(params.unidad);
        setRoles(getRolesByUnidad);
        setNextPriority(getRolesByUnidad.length + 1);
        console.log(getRolesByUnidad);
      } catch (err) {
        console.log("Error API");
      }
    })();
  }, []);

  const openUpdateDialog = (rol) => {
    setOpenUpdate(true);
    setNameParametersDialog(rol.nombre);
    setIdParametersDialog(rol.id);
  };

  const onChangeUpdateRol = (event) => {
    setNewRolName(event.target.value);
  };

  const updateRol = () => {
    updateNameById(idParametersDialog, newRolName);
    setTimeout(window.location.reload(), 10000);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClicked = () => {
    saveRol(nextPriority, inputValue, params.unidad);
    setTimeout(window.location.reload(), 10000);
  };

  const deleteRol = (id) => {
    deleteRolById(id);
    setTimeout(window.location.reload(), 10000);
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
                  textAlign: "center",
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
                    textAlign: "center",
                  }}
                  colSpan="4"
                >
                  {params.nombre}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roles?.map((rol) => (
                <TableRow key={rol.id}>
                  {/* Id_jerar */}
                  <TableCell>{rol.id_jerar}</TableCell>

                  {/* Nombre */}
                  <TableCell>{rol.nombre}</TableCell>

                  {/* Boton editar */}
                  <TableCell component="th" scope="rol">
                    <IconButton
                      onClick={() => openUpdateDialog(rol)}
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

                  {/* Boton eliminar */}
                  <TableCell component="th" scope="rol">
                    <IconButton
                      className="IconButton"
                      variant="outlined"
                      style={{
                        backgroundColor: "#B8B9BA",
                        borderRadius: "10px",
                        color: "white",
                        marginLeft: "5px",
                      }}
                      onClick={() => deleteRol(rol.id)}
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
          onClick={handleOpen}
          variant="outlined"
          startIcon={<SaveIcon />}
          style={{
            backgroundColor: "#04B8E2",
            color: "white",
            marginTop: "30px",
            marginLeft: "50px",
            borderRadius: "50px",
          }}
        >
          Agregar
        </Button>

        {/* Dialog agregar Seccion */}
        <Dialog open={open} onClose={handleClose}>
          <div className="modalTitle">
            <div className="typpgraphyTitle">Agregar Seccion</div>
          </div>

          <Grid container className="gridContainerDialog">
            <Grid
              item
              md={2}
              xs={2}
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

            <Grid item xs={10} md={10}>
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

          {/* Boton */}
          <div className="buttonDialogContainer">
            <Button
              variant="contained"
              onClick={handleButtonClicked}
              className="buttonDialog"
            >
              Agregar
            </Button>
          </div>
        </Dialog>

        {/* Dialog actualizar nombre seccion */}
        <Dialog open={openUpdate} onClose={handleCloseUpdate}>
          <div className="modalTitle">
            <div className="typpgraphyTitle">Actualizar Seccion</div>
          </div>

          <Grid container className="gridContainerDialog">
            <Grid item xs={10} md={10}>
              <TextField
                className="textField"
                label="Nuevo Nombre"
                placeholder={nameParametersDialog}
                value={newRolName}
                onChange={onChangeUpdateRol}
                focused
                style={{
                  borderRadius: "5px",
                }}
                fullWidth
              />
            </Grid>
          </Grid>

          {/* Boton */}
          <div className="buttonDialogContainer">
            <Button
              variant="contained"
              onClick={updateRol}
              className="buttonDialog"
            >
              Agregar
            </Button>
          </div>
        </Dialog>
      </Grid>
    </Grid>
  );
}
