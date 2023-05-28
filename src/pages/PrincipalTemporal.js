import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function PrincipalTemporal() {
  return (
    <div
      style={{
        display: "block",
        backgroundColor: "#193F76",
        width: "100%",
        height: "100%",
        paddingTop: "30vh",
        textAlign: "center",
        color: "white"
      }}
    >
      <ul>
        <li>
          <h1>RUTAS</h1>
        </li>
        <li>
          <Link style={{color: "white"}} to="homePage">HomePage</Link>
        </li>
        <li>
          <Link style={{color: "white"}} to="pruebasjson">Personigrama</Link>
        </li>

        <li style={{ paddingTop: "10px" }}>
          <h3>Admin Section</h3>
        </li>
        <li>
          <Link style={{color: "white"}} to="adminLogin">AdminLogin</Link>
        </li>
        <li>
          <Link style={{color: "white"}} to="adminUnidades">AdminUnidades</Link>
        </li>
        <li>
          <Link style={{color: "white"}} to="adminUsuarios">AdminUsuarios</Link>
        </li>
        <li>
          <Link style={{color: "white"}} to="confiSecciones">ConfigurarSecciones</Link>
        </li>
        <li>
          <Link style={{color: "white"}} to="seccionFuncionarios">Sección funcionarios</Link>
        </li>
        <li>
          <Link style={{color: "white"}} to="pruebaLogin">LogIn con google</Link>
        </li>
      </ul>
    </div> 
  );
}
