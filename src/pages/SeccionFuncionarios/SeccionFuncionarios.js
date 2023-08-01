import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Dialog, ListItem } from "@mui/material";
import List from "@mui/material/List";
import CloseIcon from "@mui/icons-material/Close";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import "./stylesFuncionarios.css";
import {
  getEmployeeByUnity,
  getSavePersona,
  deletePersonById,
  getPeopleDistinct,
} from "../../api/funcionarios";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Navbar from "../../components/NavBar/Navbar";

function SeccionFuncionarios() {
  let params = useParams();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [funcionarios, setFuncionarios] = useState([]);
  const [funcionariosCompletos, setFuncionariosCompletos] = useState([]);
  const [unidad, setUnidad] = React.useState("");
  const textFieldRef = useRef(null);
  const [inputValue] = useState("");

  const handleChange = async (event, newValue) => {
    if (newValue) {
      getSavePersona(newValue, unidad);
      window.alert(
        `El funcionario ${newValue.nombre}, fue agregado correcramente`
      );
      setTimeout(window.location.reload(), 10000);
    }
  };

  const deletePersona = async (event) => {
    deletePersonById(event, unidad);
    setTimeout(window.location.reload(), 10000);
  };
  const DeletePersonConfirmation = (event, name) => {
    const confirmed = window.confirm(
      "¿Estás seguro de que desea eliminar la persona: " +
      name +
      " de " +
      params.nombre +
      "?"
    );
    if (confirmed) {
      deletePersona(event);
      window.alert("El funcionario " + name + ", fue eliminado correctamente");
    }
  };

  useEffect(() => {
    if (textFieldRef.current) {
      textFieldRef.current.focus();
    }
  }, []);

  useLayoutEffect(() => {
    (async () => {
      try {
        setUnidad(params.unidad);
        const func = await getPeopleDistinct(params.unidad);
        const prueba = await getEmployeeByUnity(params.unidad);
        setFuncionarios(prueba);
        setFuncionariosCompletos(func);
      } catch (err) {
        window.alert("Error API");
      }
    })();
  }, [params.unidad]);

  return (
    <Grid
      container
      component="main"
      style={{ justifyContent: "center", display: "flex" }}
    >
      {/* Toolbar */}
      <Grid item md={12}>
        <Box sx={{ flexGrow: 1 }}>
          <Navbar title="Administrar Funcionarios" />
        </Box>
      </Grid>

      <Grid item style={{ marginTop: "50px" }}>
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 200 }}
            style={{ borderStyle: "solid", borderColor: "#04b8e2" }}
            className="tablaFuncionarios"
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
                        marginRight: "10px",
                      }}
                      onClick={() =>
                        DeletePersonConfirmation(row.cedula, row.nombre)
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

        <Button
          variant="outlined"
          onClick={handleOpen}
          startIcon={<PersonAddAltIcon />}
          style={{
            backgroundColor: "#04B8E2",
            color: "white",
            marginTop: "30px",
            marginLeft: "70px",
            borderRadius: "50px",
            marginBottom: "40px",
          }}
        >
          Agregar funcionario
        </Button>

        {/* DIALOG */}

        {/*DIALOG Agregar funcionario */}
        <Dialog open={open} onClose={handleClose}>
          <List sx={{ pt: 0 }}>
            <Toolbar className="modalTitleFuncionarios ">
              <Typography
                className="typpgraphyTitleFuncionario"
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
                onClick={() => handleClose()}
              >
                <CloseIcon className="icon" style={{ color: "white" }} />
              </IconButton>
            </Toolbar>

            <ListItem style={{ paddingTop: "10px" }}>
              <Autocomplete
                sx={{
                  "& fieldset": { border: 'none' },
                }}
                id="autocomplete"
                options={funcionariosCompletos}
                getOptionLabel={(option) => option.nombre || ""}
                value={inputValue}
                onChange={handleChange}
                className="autocomplete"
                renderInput={(params) => (
                  <TextField
                    ref={textFieldRef}
                    placeholder="Funcionario"
                    className="textField"
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderRadius: "30px",
                      borderColor: "#04B8E2",
                    }}
                    {...params}
                  />
                )}
              />
            </ListItem>
          </List>
        </Dialog>
      </Grid>
    </Grid>
  );
}

export default SeccionFuncionarios;
