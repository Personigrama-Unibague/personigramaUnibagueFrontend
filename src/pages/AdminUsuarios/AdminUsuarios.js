import React, { useLayoutEffect } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import HttpsIcon from "@mui/icons-material/Https";
import TableHead from "@mui/material/TableHead";
import CloseIcon from "@mui/icons-material/Close";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import EmailIcon from "@mui/icons-material/Email";
import TextField from "@mui/material/TextField";
import "./stylesAdminUsu.css";
import { Dialog, ListItem } from "@mui/material";
import List from "@mui/material/List";
import { getDeleteUser, getAllUsers, getSaveNewUser } from "../../api/usuarios";
import Navbar from "../../components/NavBar/Navbar";

function AdminUsuarios() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [userList, setUserList] = React.useState([]);
  const [user, setUser] = React.useState([]);
  const [password, setPassword] = React.useState([]);

  useLayoutEffect(() => {
    (async () => {
      try {
        const list = await getAllUsers();
        setUserList(list);
      } catch (err) {
        window.alert("Error API");
      }
    })();
  }, []);

  const onChangeUser = (event) => {
    setUser(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const saveUser = () => {
    if (user === "admin" || user === "Admin" || user === "ADMIN") {
      window.alert("No puede agregar un usuario de tipo admin");
      setTimeout(window.location.reload(), 10000);
    } else {
      getSaveNewUser(user, password);
      window.alert("El usuario " + user + ", fue agregado correctamente");
      setTimeout(window.location.reload(), 10000);
    }
  };

  const deleteUser = (id) => {
    getDeleteUser(id);
    setTimeout(window.location.reload(), 10000);
  };

  const DeleteUserConfirmation = (id, user) => {
    if (user === "admin") {
      window.alert("No se puede eliminar el usuario admin");
    } else {
      const confirmed = window.confirm(
        "¿Estás seguro de que desea eliminar el usuario: " + user + "?"
      );
      if (confirmed) {
        deleteUser(id);
        window.alert("El usuario " + user + ", fue eliminado correctamente");
      }
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
        <Grid item xs={12}>
          <Box sx={{ flexGrow: 1 }}>
            <Navbar title="Administrar Usuarios" />
          </Box>
        </Grid>

        {/* Grid Table */}
        <Grid
          item
          style={{
            marginTop: "50px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* Table */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    className="tableCellTitle"
                    align="center"
                    style={{ backgroundColor: "#04b8e2", color: "white" }}
                  >
                    <Typography className="adminUserText">Usuario</Typography>
                  </TableCell>
                  <TableCell
                    className="tableCellTitle"
                    align="center"
                    style={{ backgroundColor: "#04b8e2", color: "white" }}
                  >
                    <Typography className="adminUserText">Opciones</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userList.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell
                      align="center"
                      component="th"
                      scope="row"
                      className="tableCellTitle"
                    >
                      <Typography className="adminUserText">
                        {user.usuario}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        className="IconButton"
                        variant="outlined"
                        onClick={() =>
                          DeleteUserConfirmation(user.id, user.usuario)
                        }
                        style={{
                          backgroundColor: "#B8B9BA",
                          borderRadius: "10px",
                          color: "default",
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

          {/*Modal Agregar usuario */}
          <Dialog open={open} onClose={handleClose} className="modalUsuario">
            <List sx={{ pt: 0 }}>
              <Toolbar className="modalTitleUsuarios">
                <Typography
                  className="typpgraphyTitleUsuarios"
                  variant="h5"
                  style={{
                    flexGrow: 1,
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  Agregar Usuario
                </Typography>
                <IconButton
                  edge="end"
                  className="IconButton"
                  variant="outlined"
                  style={{
                    color: "default",
                  }}
                  onClick={() => handleClose()}
                >
                  <CloseIcon className="icon" style={{ color: "white" }} />
                </IconButton>
              </Toolbar>

              <ListItem>
                <Typography variant="subtitle1" style={{ paddingLeft: "20px" }}>
                  Usuario
                </Typography>
              </ListItem>

              <ListItem style={{ paddingTop: "5px" }}>
                <TextField
                  className="textField"
                  placeholder="Usuario"
                  value={user}
                  onChange={onChangeUser}
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "30px",
                    borderColor: "#04B8E2",
                  }}
                  InputProps={{
                    startAdornment: (
                      <IconButton
                        color="default"
                        sx={{ p: "10px" }}
                        style={{
                          borderRadius: "30px 0px 0px 30px",
                          backgroundColor: "#04B8E2",
                          left: "-15px",
                          padding: "16px"
                        }}
                        position="start"
                      >
                        <EmailIcon style={{ color: "white" }} />
                      </IconButton>
                    ),
                  }}
                />
              </ListItem>

              <ListItem>
                <Typography variant="subtitle1" style={{ paddingLeft: "20px" }}>
                  Contraseña
                </Typography>
              </ListItem>

              <ListItem style={{ paddingTop: "5px" }}>
                <TextField
                  className="textField"
                  placeholder="Contraseña"
                  value={password}
                  onChange={onChangePassword}
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "30px",
                    borderColor: "#04B8E2",
                  }}
                  InputProps={{
                    startAdornment: (
                      <IconButton
                        color="default"
                        sx={{ p: "10px" }}
                        style={{
                          borderRadius: "30px 0px 0px 30px",
                          backgroundColor: "#04B8E2",
                          left: "-15px",
                          padding: "16px"
                        }}
                        position="start"
                      >
                        <HttpsIcon style={{ color: "white" }} />
                      </IconButton>
                    ),
                  }}
                />
              </ListItem>

              <ListItem style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  className="agregarUsuarioButton"
                  variant="outlined"
                  onClick={saveUser}
                  style={{
                    backgroundColor: "#04B8E2",
                    color: "white",
                    marginTop: "30px",
                    borderRadius: "50px",
                  }}
                >
                  Agregar
                </Button>
              </ListItem>
            </List>
          </Dialog>
        </Grid>
      </Grid>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="outlined"
          onClick={handleOpen}
          startIcon={<PersonAddAltOutlinedIcon />}
          style={{
            backgroundColor: "#04B8E2",
            color: "white",
            marginTop: "30px",
            borderRadius: "50px",
          }}
        >
          Agregar Usuario
        </Button>
      </div>
    </>
  );
}

export default AdminUsuarios;
