import React, { Component, useState, useEffect, useLayoutEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Dialog, Grid, MenuItem, Select, TextField } from "@material-ui/core";
import Typography from "@mui/material/Typography";
import InputOutlinedIcon from "@mui/icons-material/InputOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@material-ui/core";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import SaveIcon from "@mui/icons-material/Save";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import IconButton from "material-ui/IconButton";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useParams } from "react-router-dom";
import {
  deleteRolById,
  getAllRolesByUnity,
  saveRol,
  updateIdJerarRol,
  updateNameById,
} from "../../api/roles";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import { List, ListItem } from "material-ui";
import "./styles.css";
import {
  getEmployeeByUnity,
  getPersonasDistinct,
  updateIdJerarByCedulaUnd,
  updateIdJerarDefault,
  updateIdJerarDefaultALlSection,
} from "../../api/funcionarios";
import LogOut from "../../components/LogOut/LogOut";
import AdminUsername from "../../components/AdminUsername/AdminUsername";

export default function ConfigurarSecciones() {
  let params = useParams();

  const [roles, setRoles] = useState([]);

  /* Hook Dialog */
  const [open, setOpen] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [openPerson, setOpenPerson] = React.useState(false);
  const [openTablePerson, setOpenTablePerson] = React.useState(false);

  const [nextPriority, setNextPriority] = useState([]);
  const [nameParametersDialog, setNameParametersDialog] = React.useState();
  const [
    idJerarParametersDialog,
    setIdJerarParametersDialog,
  ] = React.useState();

  /* General Hooks */
  const [idParametersDialog, setIdParametersDialog] = React.useState();
  const [newRolName, setNewRolName] = React.useState();
  const [funcionarios, setFuncionarios] = useState([]);
  const [funcionarioJerar, setFuncionarioJerar] = useState([]);
  const [table, setTable] = useState([]);
  const [addPerson, setAddPerson] = useState([]);
  const [deleteTable, setDeleteTable] = useState([]);
  const [idJerarAdd, setIdJerarAdd] = useState([]);
  const [inputValue, setInputValue] = useState("");

  /* Handle Hooks */
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenUpdate = () => setOpenUpdate(true);
  const handleCloseUpdate = () => setOpenUpdate(false);
  const handleOpenAddPerson = () => setOpenPerson(true);
  const handleCloseAddPerson = () => setOpenPerson(false);
  const handleOpenTablePerson = () => setOpenTablePerson(true);
  const handleCloseTablePerson = () => setOpenTablePerson(false);

  useLayoutEffect(() => {
    (async () => {
      try {
        const getRolesByUnidad = await getAllRolesByUnity(params.unidad);
        const func = await getEmployeeByUnity(params.unidad);
        setRoles(getRolesByUnidad);
        setNextPriority(getRolesByUnidad.length);
        setFuncionarios(func);
      } catch (err) {
        console.log("Error API");
      }
    })();
  }, []);

  /* DIALOGS */

  /* Dialog Actualizar Rol */
  const openUpdateDialog = (rol) => {
    setOpenUpdate(true);
    setNameParametersDialog(rol.nombre);
    setIdParametersDialog(rol.id);
  };

  /* Dialog Tabla de Personas por rol */
  const openTablePersonDialog = (id, name) => {
    const list = funcionarios.filter((persona) => persona.id_jerar == id);
    setTable(list);
    setOpenTablePerson(true);
  };

  /* Dialog Agregar Persona */
  const openPersonDialog = (id, nombre) => {
    var list = [];
    if (nombre == "Primario") {
      const prim = funcionarios.filter((persona) => persona.id_jerar == 1);
      console.log(prim);
      if (prim.length === 0) {
        list = funcionarios.filter((persona) => persona.id_jerar == 0);
        setFuncionarioJerar(list);
        setOpenPerson(true);
        setIdJerarAdd(id);
      } else {
        alert("Solo puede existir un lider de area");
      }
    } else {
      list = funcionarios.filter((persona) => persona.id_jerar == 0);
      setFuncionarioJerar(list);
      setOpenPerson(true);
      setIdJerarAdd(id);
    }
  };

  /* CHANGE */

  /* Change par aagregar persona */
  const handleChangeAddPerson = async (event) => {
    updateIdJerarByCedulaUnd(idJerarAdd, event.target.value, params.unidad);
    setTimeout(window.location.reload(), 10000);
  };

  /* Change para actualizar el nombre del rol */
  const onChangeUpdateRol = (event) => {
    setNewRolName(event.target.value);
  };

  /* Change para actualizar el el id_jerar del rol */
  const onChangeUpdatIdJerareRol = (event) => {
    const value = event.target.value;
    if (value != "0" || value != "1") {
      setIdJerarParametersDialog(event.target.value);
    }
  };

  const filterInputValue = () => {
    if (idJerarParametersDialog == "0") {
      alert(
        "No puede asignar el id 0 ya que este se encuentra asignado a roles predeterminados"
      );
      return "";
    } else if (idJerarParametersDialog == "1") {
      alert(
        "No puede asignar el id 1 ya que este se encuentra asignado a roles predeterminados"
      );
      return "";
    }
    return idJerarParametersDialog;
  };

  /* METODOS */

  /* Actualizar nombre del rol */
  const updateRol = () => {
    console.log(idParametersDialog);
    console.log(newRolName);
    console.log(idJerarParametersDialog);

    const rol = roles.filter((rol) => rol.id == idParametersDialog);

    if (newRolName == undefined || newRolName == "") {
      updateIdJerarRol(rol[0].id_jerar, idJerarParametersDialog, params.unidad);
      setTimeout(window.location.reload(), 10000);
    } else if (
      idJerarParametersDialog == undefined ||
      idJerarParametersDialog == ""
    ) {
      updateNameById(idParametersDialog, newRolName);
      setTimeout(window.location.reload(), 10000);
    } else {
      updateNameById(idParametersDialog, newRolName);
      updateIdJerarRol(rol[0].id_jerar, idJerarParametersDialog, params.unidad);
      setTimeout(window.location.reload(), 10000);
    }
  };

  /* Borrar Rol */
  const deleteRol = (id, id_jerar) => {
    updateIdJerarDefaultALlSection(params.unidad, id_jerar);
    deleteRolById(id, params.unidad);
    setTimeout(window.location.reload(), 10000);
  };

  /* Cambiar valor del input */
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  /* Crear Rol */
  const handleButtonClicked = () => {
    saveRol(nextPriority, inputValue, params.unidad);
    setTimeout(window.location.reload(), 10000);
  };

  /* Default Id_jerar de personas por rol */
  const deleteFuncionarioSeccion = (cedula) => {
    updateIdJerarDefault(cedula, params.unidad);
    setTimeout(window.location.reload(), 10000);
  };

  /*Método para confirmar la eliminación de un rol */
  const DeleteRolConfirmation = (id, id_jerar, nombre) => {
    const confirmed = window.confirm(
      "¿Estás seguro de que desea eliminar la sección: " + nombre + "?"
    );
    if (confirmed) {
      deleteRol(id, id_jerar);
    }
  };
  /*Método para confirmar la eliminación de un rol */
  const DeleteUserConfirmation = (id, nombre) => {
    const confirmed = window.confirm(
      "¿Estás seguro de que desea eliminar el funcionario : " +
        nombre +
        " de esta sección?"
    );
    if (confirmed) {
      deleteFuncionarioSeccion(id);
    }
  };

  return (
    <>
      <Grid
        container
        component="main"
        style={{ justifyContent: "center", display: "flex" }}
        justify="center"
      >
        <Grid item md={12}>
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
                <AdminUsername />
                <LogOut />
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
                    colSpan="6"
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

                    {/* Demas unidades */}
                    {rol.unidad != "0" && rol.id_jerar != 0 ? (
                      <>
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
                            onClick={() =>
                              DeleteRolConfirmation(
                                rol.id,
                                rol.id_jerar,
                                rol.nombre
                              )
                            }
                          >
                            <DeleteOutlineOutlinedIcon
                              className="icon"
                              style={{ color: "white" }}
                            />
                          </IconButton>
                        </TableCell>

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
                            onClick={() =>
                              openPersonDialog(rol.id_jerar, rol.nombre)
                            }
                          >
                            <PersonAddIcon
                              className="icon"
                              style={{ color: "white" }}
                            />
                          </IconButton>
                        </TableCell>
                      </>
                    ) : rol.unidad == "0" &&
                      rol.id_jerar == 1 &&
                      rol.nombre == "Primario" ? (
                      <>
                        <TableCell component="th" scope="rol">
                          <IconButton
                            disabled={true}
                            className="IconButton"
                            style={{
                              backgroundColor: "#B8B9BA",
                              borderRadius: "10px",
                              color: "white",
                              marginLeft: "5px",
                              textAlign: "center",
                            }}
                          >
                            <HorizontalRuleIcon
                              className="icon"
                              style={{ color: "white" }}
                            />
                          </IconButton>
                        </TableCell>

                        <TableCell component="th" scope="rol">
                          <IconButton
                            disabled={true}
                            className="IconButton"
                            style={{
                              backgroundColor: "#B8B9BA",
                              borderRadius: "10px",
                              color: "white",
                              marginLeft: "5px",
                              textAlign: "center",
                            }}
                          >
                            <HorizontalRuleIcon
                              className="icon"
                              style={{ color: "white" }}
                            />
                          </IconButton>
                        </TableCell>

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
                            onClick={() =>
                              openPersonDialog(rol.id_jerar, rol.nombre)
                            }
                          >
                            <PersonAddIcon
                              className="icon"
                              style={{ color: "white" }}
                            />
                          </IconButton>
                        </TableCell>
                      </>
                    ) : (
                      /* Nuestros Integrantes */
                      <>
                        <TableCell component="th" scope="rol">
                          <IconButton
                            disabled={true}
                            className="IconButton"
                            style={{
                              backgroundColor: "#B8B9BA",
                              borderRadius: "10px",
                              color: "white",
                              marginLeft: "5px",
                              textAlign: "center",
                            }}
                          >
                            <HorizontalRuleIcon
                              className="icon"
                              style={{ color: "white" }}
                            />
                          </IconButton>
                        </TableCell>
                        <TableCell component="th" scope="rol">
                          <IconButton
                            disabled={true}
                            className="IconButton"
                            variant="outlined"
                            style={{
                              backgroundColor: "#B8B9BA",
                              borderRadius: "10px",
                              color: "white",
                              marginLeft: "5px",
                            }}
                          >
                            <HorizontalRuleIcon
                              className="icon"
                              style={{ color: "white" }}
                            />
                          </IconButton>
                        </TableCell>
                        <TableCell component="th" scope="rol">
                          <IconButton
                            disabled={true}
                            className="IconButton"
                            variant="outlined"
                            style={{
                              backgroundColor: "#B8B9BA",
                              borderRadius: "10px",
                              color: "white",
                              marginLeft: "5px",
                            }}
                          >
                            <HorizontalRuleIcon
                              className="icon"
                              style={{ color: "white" }}
                            />
                          </IconButton>
                        </TableCell>
                      </>
                    )}
                    {/* Boton Mostrar Personas */}
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
                        onClick={() =>
                          openTablePersonDialog(rol.id_jerar, rol.nombre)
                        }
                      >
                        <MenuIcon className="icon" style={{ color: "white" }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        {/* DIALOGS */}

        {/* Dialog agregar Seccion */}
        <Dialog open={open} onClose={handleClose}>
          {/* Titulo */}
          <Toolbar className="modalTitle">
            <Typography
              className="typpgraphyTitle"
              variant="h5"
              style={{ flexGrow: 1, textAlign: "center", fontWeight: "bold" }}
            >
              Agregar Sección
            </Typography>
            <IconButton
              edge="end"
              className="IconButton"
              variant="outlined"
              style={{
                color: "white",
              }}
              onClick={() => handleClose()}
            >
              <CloseIcon className="icon" style={{ color: "white" }} />
            </IconButton>
          </Toolbar>

          <Grid container className="gridContainerDialog">
            {/* Id_jerar */}
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
            {/* Nombre */}
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
          <Toolbar className="modalTitle">
            <Typography
              className="typpgraphyTitle"
              variant="h5"
              style={{ flexGrow: 1, textAlign: "center", fontWeight: "bold" }}
            >
              Agregar Sección
            </Typography>
            <IconButton
              edge="end"
              className="IconButton"
              variant="outlined"
              style={{
                color: "white",
              }}
              onClick={() => handleCloseUpdate()}
            >
              <CloseIcon className="icon" style={{ color: "white" }} />
            </IconButton>
          </Toolbar>

          <Grid container className="gridContainerDialog">
            {/* Id_jerar */}
            <Grid
              item
              md={2}
              style={{
                borderColor: "#04B8E2",
              }}
            >
              <TextField
                label="Prioridad"
                focused
                placeholder={nextPriority}
                value={filterInputValue()}
                onChange={onChangeUpdatIdJerareRol}
                style={{ width: "200px" }}
                fullWidth
              />
            </Grid>
            {/* Nombre */}
            <Grid item md={10}>
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

        {/* Dialog para agregar personas a la seccion */}
        <Dialog open={openPerson} onClose={handleCloseAddPerson}>
          <Toolbar className="modalTitle">
            <Typography
              className="typpgraphyTitle"
              variant="h5"
              style={{ flexGrow: 1, textAlign: "center", fontWeight: "bold" }}
            >
              Agregar Funcionario
            </Typography>
            <IconButton
              edge="end"
              className="IconButton"
              variant="outlined"
              style={{
                color: "white",
              }}
              onClick={() => handleCloseAddPerson()}
            >
              <CloseIcon className="icon" style={{ color: "white" }} />
            </IconButton>
          </Toolbar>
          <List sx={{ pt: 0 }}>
            <ListItem style={{ paddingTop: "30px", width: "450px" }}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={addPerson}
                label="Funcionarios"
                onChange={handleChangeAddPerson}
                className="textField"
                placeholder="Funcionario"
                focused
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "30px",
                  borderColor: "#04B8E2",
                }}
              >
                {funcionarioJerar.map((option) => (
                  <MenuItem key={option.id} value={option.cedula}>
                    {option.nombre}
                  </MenuItem>
                ))}
              </Select>
            </ListItem>
          </List>
        </Dialog>

        {/* Dialog para Mostrar las personas de la seccion */}
        <Dialog open={openTablePerson} onClose={handleCloseTablePerson}>
          <List sx={{ pt: 0 }}>
            <ListItem style={{ paddingTop: "10px", width: "450px" }}>
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
                        colSpan="3"
                      >
                        <Toolbar className="modalTitle">
                          <Typography
                            className="typpgraphyTitle"
                            variant="h6"
                            style={{
                              flexGrow: 1,
                              textAlign: "center",
                              fontWeight: "bold",
                            }}
                          >
                            Ver Funcionarios
                          </Typography>
                          <IconButton
                            edge="end"
                            className="IconButton"
                            variant="outlined"
                            style={{
                              color: "white",
                            }}
                            onClick={() => handleCloseTablePerson()}
                          >
                            <CloseIcon
                              className="icon"
                              style={{ color: "white" }}
                            />
                          </IconButton>
                        </Toolbar>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {table.map((row) => (
                      <TableRow key={row.nombre}>
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          {row.nombre}
                        </TableCell>

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
                            onClick={() =>
                              DeleteUserConfirmation(row.cedula, row.nombre)
                            }
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
            </ListItem>
          </List>
        </Dialog>
      </Grid>

      {/* Boton Agregar */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          onClick={handleOpen}
          variant="outlined"
          startIcon={<SaveIcon />}
          style={{
            backgroundColor: "#04B8E2",
            color: "white",
            marginTop: "30px",
            borderRadius: "50px",
          }}
        >
          Agregar
        </Button>
      </div>
    </>
  );
}
