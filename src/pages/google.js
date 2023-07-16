import React from "react";

import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

const google = () => {
  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        console.log(credentialResponse);
        var decoded = jwt_decode(credentialResponse.credential);
        console.log(decoded)
      }}
      onError={() => {
        console.log("Login Failed");
      }}
    />
  );
};

export default google;
