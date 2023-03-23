import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function PrincipalTemporal() {
  return (
    <div style={{ display: "block" }}>
      <ul>
        <li>
          <h1>RUTAS</h1>
        </li>
        <li>
          <Link to="homePage">HomePage</Link>
        </li>
        <li>
          <Link to="personigrama">Personigrama</Link>
        </li>

        <li style={{ paddingTop: "10px" }}>
          <h3>Admin Section</h3>
        </li>
        <li>
          <Link to="adminLogin">AdminLogin</Link>
        </li>
        <li>
          <Link to="adminUnidades">AdminUnidades</Link>
        </li>
        <li>
          <Link to="adminUsuarios">AdminUsuarios</Link>
        </li>
        <li>
          <Link to="confiSecciones">ConfigurarSecciones</Link>
        </li>
      </ul>
    </div>
  );
}
