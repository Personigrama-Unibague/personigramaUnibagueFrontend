import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import { getUnities } from "../../api/unidades";
import { Link } from "react-router-dom";
import "./stylesAdminUni.css";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Collapse,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import Navbar from "../../components/NavBar/Navbar";

export default function AdminUnidades() {
  const [unidades, setUnidades] = useState([]);

  useEffect(() => {
    async function fetchUnidades() {
      try {
        const und = await getUnities();
        setUnidades(und.children);
      } catch (err) {
        window.alert("Error API");
      }
    }
    fetchUnidades();
  }, []);

  const Row = ({ row, level }) => {
    const [open, setOpen] = useState(false);

    const handleOpenRow = () => {
      setOpen(!open);
    };

    return (
      <React.Fragment key={row.id}>
        <TableRow>
          <TableCell>
            {row.children && (
              <IconButton size="small" onClick={handleOpenRow}>
                {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
              </IconButton>
            )}
          </TableCell>
          <TableCell style={{ width: `${30 + level * 20}px`, padding: "5px" }}>
            {row.nombre}
          </TableCell>
          <TableCell>{row.id}</TableCell>

          <TableCell align="center">
            <IconButton
              className="IconButton"
              variant="outlined"
              component={Link}
              to={`/confiSecciones/${row.id}/${row.nombre}`}
              style={{
                backgroundColor: "#04b8e2",
                marginLeft: "10px",
                borderRadius: "5px",
                color: "white",
              }}
            >
              <ListAltOutlinedIcon className="icon" style={{ color: "white" }} />
            </IconButton>
          </TableCell>
          <TableCell align="center">
            <IconButton
              className="IconButton"
              variant="outlined"
              component={Link}
              to={`/seccionFuncionarios/${row.id}/${row.nombre}`}
              style={{
                backgroundColor: "#04b8e2",
                marginLeft: "10px",
                borderRadius: "5px",
                color: "white",
              }}
            >
              <AssignmentIndOutlinedIcon
                className="icon"
                style={{ color: "white" }}
              />
            </IconButton>
          </TableCell>
        </TableRow>
        {row.children && (
          <TableRow>
            <TableCell
              style={{
                paddingBottom: 0,
                paddingTop: 0,
                paddingLeft: `${30 + level * 20}px`,
                paddingRight: 0,
              }}
              colSpan={5}
            >
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Table>
                  <TableBody>
                    {row.children.map((child) => (
                      <Row key={child.id} row={child} level={level + 1} />
                    ))}
                  </TableBody>
                </Table>
              </Collapse>
            </TableCell>
          </TableRow>
        )}
      </React.Fragment>
    );
  };

  return (
    <Grid
      container
      component="main"
      style={{ justifyContent: "center", display: "flex" }}
      justifyContent="center"
    >
      <Grid item md={12}>
        <Box sx={{ flexGrow: 1 }}>
          <Navbar title="Administrar Unidades" />
        </Box>
      </Grid>
      {unidades.length > 0 ? (
        <Grid item style={{ marginTop: "50px" }}>
          <TableContainer component={Paper} style={{ borderRadius: "10px 10px 0px 0px" }}>
            <Table className="marginTableAdmin">
              <TableHead>
                <TableRow>
                  <TableCell
                    className="tableCellTitleAdmin"
                    align="center"
                    style={{
                      backgroundColor: "#02AFD8",
                      color: "#002b4e",
                      fontWeight: "bold",
                    }}
                  >
                    -
                  </TableCell>
                  <TableCell
                    className="tableCellTitleAdmin"
                    align="left"
                    style={{
                      backgroundColor: "#02AFD8",
                      color: "#002b4e",
                      fontWeight: "bold",
                    }}
                  >
                    Unidad
                  </TableCell>
                  <TableCell
                    className="tableCellTitleAdmin"
                    align="center"
                    style={{
                      backgroundColor: "#02AFD8",
                      color: "#002b4e",
                      fontWeight: "bold",
                    }}
                  >
                    Numero
                  </TableCell>
                  <TableCell
                    className="tableCellTitleAdmin"
                    align="center"
                    style={{
                      backgroundColor: "#02AFD8",
                      color: "#002b4e",
                      fontWeight: "bold",
                    }}
                  >
                    Secciones
                  </TableCell>
                  <TableCell
                    className="tableCellTitleAdmin"
                    align="center"
                    style={{
                      backgroundColor: "#02AFD8",
                      color: "#002b4e",
                      fontWeight: "bold",
                    }}
                  >
                    Funcionarios
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {unidades.map((row) => (
                  <Row key={row.id} row={row} level={0} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      ) : (
        <h1>Cargando...</h1>
      )}
    </Grid>
  );
}
