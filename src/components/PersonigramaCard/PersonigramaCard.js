import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./PersonigramaCard.css";

export default function PersonigramaCard(props) {
  return (
    <div className="card">
      {/* Back */}
      <Card className="cardBack">
        <div className="cardBackContainer">
          <Typography className="profileName">
            {props.personal.nombre}
          </Typography>
          <Typography className="profileCharge">
            {props.personal.cargo}
          </Typography>

          <Typography className="profileSubtitle">Correo</Typography>
          <Typography className="profileSubInfoCorreo">
            {props.personal.correo}
          </Typography>

          <Typography className="profileSubtitle">Telefono</Typography>
          <Typography className="profileSubInfo">
            {props.personal.telefono}
          </Typography>

          {/* Dot */}
          <div className="footerDot">
            <Typography className="FooterTitle">Extensión</Typography>
            <Typography className="FooterDescription">
              {props.personal.extension}
            </Typography>
          </div>
        </div>
      </Card>

      {/* Front */}
      <Card className="cardFront">
        <div>
          <CardMedia
            className="cardMedia"
            component="img"
            image={"https://" + props.personal.foto}
            title="Funcionario"
          />
          <CardContent>
            <Typography className="profileName">
              {props.personal.nombre}
            </Typography>
            <Typography className="profileCharge">
              {props.personal.cargo}
            </Typography>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
