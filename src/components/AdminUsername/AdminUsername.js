import React from "react";
import Typography from "@mui/material/Typography";
import Cookies from "js-cookie";
function AdminUsername() {
  const username = Cookies.get("username")

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
