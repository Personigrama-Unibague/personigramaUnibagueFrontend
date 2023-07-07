import React from "react";
import Typography from "@mui/material/Typography";
function AdminUsername() {
  const username = localStorage.getItem("username")

  return (
    <div>
      <Typography
        variant="h6"
        component="div"
        sx={{ flexGrow: 1 }}
        style={{
          justifyContent: "center",
          display: "flex",
          fontSize: "15px",
        }}
      >
        {username}
      </Typography>
    </div>
  );
}

export default AdminUsername;
