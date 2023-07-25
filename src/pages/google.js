import React from "react";

import { GoogleLogin } from "@react-oauth/google";
//import jwt_decode from "jwt-decode";

const google = () => {
  return (
    <GoogleLogin
      // onSuccess={(credentialResponse) => {
      //   var decoded = jwt_decode(credentialResponse.credential);
      // }}
      onError={() => {}}
    />
  );
};

export default google;
