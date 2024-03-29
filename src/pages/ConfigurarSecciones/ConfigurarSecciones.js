import React, { useState, useLayoutEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Dialog, Grid, Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import SaveIcon from "@mui/icons-material/Save";
import IconButton from "@mui/material/IconButton";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useParams } from "react-router-dom";
import {
  deleteRolById,
  getAllRolesByUnity,
  saveRol,
  updateIdJerarRol,
  updateNameById,
} from "../../api/roles";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import { List, ListItem } from "@mui/material";
import "./stylesConfSec.css";
import {
  getEmployeeByUnity,
  updateIdJerarByCedulaUnd,
  updateIdJerarDefault,
  updateIdJerarDefaultALlSection,
} from "../../api/funcionarios";
import Navbar from "../../components/NavBar/Navbar";

export default function ConfigurarSecciones() {
  let params = useParams();

  const [roles, setRoles] = useState([]);

  /* Hook Dialog */
  const [open, setOpen] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [openPerson, setOpenPerson] = React.useState(false);
  const [openTablePerson, setOpenTablePerson] = React.useState(false);
  const [selectedPerson, setSelectedPerson] = React.useState(null);

  const [nextPriority, setNextPriority] = useState([]);
  const [nameParametersDialog, setNameParametersDialog] = React.useState();
  const [
    idJerarRolDialogParametersDialog,
    setIdJerarRolDialogParametersDialog,
  ] = React.useState();

  const [idJerarParametersDialog, setIdJerarParametersDialog] = React.useState();

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
        setFuncionarios(func);
      } catch (err) {
        window.alert("Error API");
      }
    })();
  }, [params.unidad]);

  /* DIALOGS */

  /* Dialog Actualizar Rol */
  const openUpdateDialog = (rol) => {
    setOpenUpdate(true);
    setNameParametersDialog(rol.nombre);
    setIdParametersDialog(rol.id);
    setIdJerarRolDialogParametersDialog(rol.id_jerar);
  };

  /* Dialog Tabla de Personas por rol */
  const openTablePersonDialog = (id, name) => {
    const list = funcionarios.filter((persona) => persona.id_jerar === id);
    setTable(list);
    setOpenTablePerson(true);
  };

  /* Dialog Agregar Persona */
  const openPersonDialog = (id, nombre) => {
    var list = [];
    if (nombre === "Primario") {
      const prim = funcionarios.filter((persona) => persona.id_jerar === 1);
      if (prim.length === 0) {
        list = funcionarios.filter((persona) => persona.id_jerar === 0);
        setFuncionarioJerar(list);
        setOpenPerson(true);
        setIdJerarAdd(id);
      } else {
        alert("Solo puede existir un lider de area");
      }
    } else {
      list = funcionarios.filter((persona) => persona.id_jerar === 0);
      setFuncionarioJerar(list);
      setOpenPerson(true);
      setIdJerarAdd(id);
    }
  };

  /* CHANGE */

  /* Change par aagregar persona */
  const handleChangeAddPerson = async (event, value) => {
    if (value) {
      updateIdJerarByCedulaUnd(idJerarAdd, value.cedula, params.unidad);
      window.alert("El funcionario fue agregado exitosamente");
      setTimeout(window.location.reload(), 10000);
    }
  };

  /* Change para actualizar el nombre del rol */
  const onChangeUpdateRol = (event) => {
    setNewRolName(event.target.value);
  };

  /* Change para actualizar el el id_jerar del rol */
  const onChangeUpdatIdJerareRol = (event) => {
    const value = event.target.value;
    if (value !== "0" || value !== "1") {
      setIdJerarParametersDialog(event.target.value);
    }
  };

  const filterInputValue = () => {
    const rol = roles.filter(
      (rol) =>
        rol.id_jerar === idJerarParametersDialog &&
        rol.id_jerar !== 0 &&
        rol.id_jerar !== 1
    );

    if (idJerarParametersDialog === "0") {
      alert(
        "No puede asignar el id 0 ya que este se encuentra asignado a roles predeterminados"
      );
      setIdJerarParametersDialog("");
      return "";
    } else if (idJerarParametersDialog === "1") {
      alert(
        "No puede asignar el id 1 ya que este se encuentra asignado a roles predeterminados"
      );
      setIdJerarParametersDialog("");
      return "";
    } else if (rol.length > 0) {
      alert(
        "No puede asignar el id " +
        idJerarParametersDialog +
        "(" +
        rol[0].nombre +
        ")" +
        " ya que este ya existe"
      );
      setIdJerarParametersDialog();
      return "";
    } 

    return idJerarParametersDialog;
  };

  /* METODOS */

  /* Actualizar nombre del rol y idJerar */
  const updateRol = () => {
    const rol = roles.filter((rol) => rol.id === idParametersDialog);

    if (newRolName === undefined || newRolName === "") {
      updateIdJerarRol(rol[0].id_jerar, idJerarParametersDialog, params.unidad);
      window.alert("Sección actualizada correctamente");
      setTimeout(window.location.reload(), 10000);
    } else if (
      idJerarParametersDialog === undefined ||
      idJerarParametersDialog === ""
    ) {
      updateNameById(idParametersDialog, newRolName);
      window.alert("Sección actualizada correctamente");
      setTimeout(window.location.reload(), 10000);
    } else {
      updateNameById(idParametersDialog, newRolName);
      updateIdJerarRol(rol[0].id_jerar, idJerarParametersDialog, params.unidad);
      window.alert("Sección actualizada correctamente");
      setTimeout(window.location.reload(), 10000);
    }
  };

  /* Borrar Rol */
  const deleteRol = (id, id_jerar) => {
    updateIdJerarDefaultALlSection(params.unidad, id_jerar);
    deleteRolById(id, params.unidad);
    window.alert("La sección fue eliminada exitosamente");
    setTimeout(window.location.reload(), 10000);
  };

  /* Cambiar valor del input */
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  /* Crear Rol */
  const handleButtonClicked = () => {
    saveRol(inputValue, params.unidad);
    saveRol(nextPriority, inputValue, params.unidad);
    window.alert("La sección fue creada exitosamente");
    setTimeout(window.location.reload(), 10000);
  };

  /* Default Id_jerar de personas por rol */
  const deleteFuncionarioSeccion = (cedula) => {
    updateIdJerarDefault(cedula, params.unidad);
    window.alert("El funcionario fue eliminado exitosamente");
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
  /*Método para confirmar la eliminación de un funcionario */
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
        justifyContent="center"
      >
        {/* Toolbar */}
        <Grid item md={12}>
          <Box sx={{ flexGrow: 1 }}>
            <Navbar title="Configurar Secciones" />
          </Box>
        </Grid>
        <Grid item style={{ marginTop: "50px" }}>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 200 }}
              style={{ borderStyle: "solid", borderColor: "#04b8e2" }}
              className="tablaSecciones"
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{
                      backgroundColor: "#04b8e2",
                      color: "#002b4e",
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
                    {rol.unidad !== "0" && rol.id_jerar !== 0 ? (
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
                    ) : rol.unidad === "0" &&
                      rol.id_jerar === 1 &&
                      rol.nombre === "Primario" ? (
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
          <Toolbar className="modalTitleSecciones">
            <Typography
              className="typpgraphyTitleSeccion"
              variant="h5"
              style={{ flexGrow: 1, textAlign: "center", fontWeight: "bold", color: "#002b4e" }}
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

          <Box style={{ padding: "15px" }}>
            <TextField
              sx={{
                "& fieldset": { border: 'none' },
              }}
              className="textField"
              placeholder="Nombre de la Sección"
              value={inputValue}
              onChange={handleInputChange}
              focused
              style={{
                borderRadius: "5px",
              }}
              fullWidth />
          </Box>

          {/* Boton */}
          <div className="buttonDialogContainerAgregar">
            <Button
              variant="contained"
              onClick={handleButtonClicked}
              className="buttonDialog"
            >
              Agregar
            </Button>
          </div>
        </Dialog>

        {/* Dialog actualizar nombre y Id_jerar seccion */}
        <Dialog open={openUpdate} onClose={handleCloseUpdate}>
          <Toolbar className="modalTitleSecciones">
            <Typography
              className="typpgraphyTitleSeccion"
              variant="h5"
              style={{ flexGrow: 1, textAlign: "center", fontWeight: "bold", color: "#002b4e" }}
            >
              Actualizar Sección
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

          <Grid container spacing={2} className="gridContainerDialog">
            <Grid item xs={6} className="titlesActualizarSeccion">
              Prioridad
            </Grid>
            <Grid item xs={6} className="titlesActualizarSeccion">
              Nuevo Nombre
            </Grid>
          </Grid>
          <Grid container spacing={2} className="gridContainerDialog">
            <Grid item xs={6}>
              <Box display="flex" alignItems="center">
                <TextField
                  sx={{
                    "& fieldset": { border: 'none' },
                  }}
                  className="textFieldUpdate"
                  focused
                  placeholder={String(idJerarRolDialogParametersDialog)}
                  value={filterInputValue()}
                  onChange={onChangeUpdatIdJerareRol}
                  fullWidth
                />
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box display="flex" alignItems="center">
                <TextField
                  sx={{
                    "& fieldset": { border: 'none' },
                  }}
                  className="textFieldUpdate"
                  placeholder={nameParametersDialog}
                  value={newRolName}
                  onChange={onChangeUpdateRol}
                  focused
                  fullWidth
                />
              </Box>
            </Grid>
          </Grid>

          <div className="buttonDialogContainer">
            <Button
              variant="contained"
              onClick={updateRol}
              className="buttonDialog"
            >
              Actualizar
            </Button>
          </div>
        </Dialog>

        {/* Dialog para agregar personas a la seccion */}
        <Dialog open={openPerson} onClose={handleCloseAddPerson}>
          <Toolbar className="modalTitleSecciones">
            <Typography
              className="typpgraphyTitleSeccion"
              variant="h5"
              style={{ flexGrow: 1, textAlign: "center", fontWeight: "bold", color: "#002b4e" }}
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
            <ListItem className="lisItem">
              <Autocomplete
                sx={{
                  "& fieldset": { border: 'none' },
                }}
                value={selectedPerson}
                className="autocomplete"
                onChange={handleChangeAddPerson}
                options={funcionarioJerar}
                getOptionLabel={(option) => option.nombre}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    className="textField"
                    placeholder="Funcionario"
                    focused
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderRadius: "30px",
                      borderColor: "#04B8E2",
                    }}

                  />
                )}
              />
            </ListItem>
          </List>
        </Dialog>

        {/* Dialog para Mostrar las personas de la seccion */}
        <Dialog open={openTablePerson} onClose={handleCloseTablePerson}>
          <List sx={{ pt: 0 }}>
            <ListItem className="lisItem">
              <TableContainer component={Paper}>
                <Table
                  style={{ borderStyle: "solid", borderColor: "#04b8e2" }}
                  className="tablaVerFuncionarios"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell
                        style={{
                          backgroundColor: "#04b8e2",

                          color: "white",
                          fontSize: "20px",
                          textAlign: "center",
                        }}
                        colSpan="3"
                      >
                        <Toolbar className="modalTitle">
                          <Typography
                            className="typpgraphyTitleSeccion"
                            variant="h6"
                            style={{
                              flexGrow: 1,
                              textAlign: "center",
                              fontWeight: "bold",
                              color: "#002b4e"
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
                              marginLeft: "1px",
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
                      <TableRow
                        key={row.nombre}
                        style={{ paddingRight: "30px" }}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            justifyContent: "flex-start",
                          }}
                        >
                          {row.nombre}
                        </TableCell>
                        {row.id_jerar !== 0 ? (
                          <>
                            <TableCell
                              align="center"
                              style={{ minWidth: "40px" }}
                            >
                              <IconButton
                                className="IconButton"
                                variant="outlined"
                                style={{
                                  backgroundColor: "#B8B9BA",
                                  borderRadius: "10px",
                                  color: "white",
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
                          </>
                        ) : (
                          <></>
                        )}
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
            color: "#002b4e",
            marginTop: "30px",
            borderRadius: "50px",
          }}
        >
          Agregar Sección
        </Button>
      </div>
    </>
  );
}
