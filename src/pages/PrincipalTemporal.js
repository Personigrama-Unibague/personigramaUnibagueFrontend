import React from "react";
import { Link } from "react-router-dom";

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
        color: "white",
      }}
    >
      <ul>
        <li>
          <h1>RUTAS</h1>
        </li>
        <li>
          <Link style={{ color: "white" }} to="organigrama">
            HomePage
          </Link>
        </li>

        <li style={{ paddingTop: "10px" }}>
          <h3>Admin Section</h3>
        </li>
        <li>
          <Link style={{ color: "white" }} to="adminLogin">
            AdminLogin
          </Link>
        </li>
        <li>
          <Link style={{ color: "white" }} to="adminUnidades">
            AdminUnidades
          </Link>
        </li>
        <li>
          <Link style={{ color: "white" }} to="adminUsuarios">
            AdminUsuarios
          </Link>
        </li>
      </ul>
    </div>
  );
}
