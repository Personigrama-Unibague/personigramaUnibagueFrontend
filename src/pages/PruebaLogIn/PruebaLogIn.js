import React, { useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Google from "../google";


function PruebaLogIn() {
  return (
    <div>
      <GoogleOAuthProvider clientId="577630477033-tlna5td2dva4mf43g2ciarsfcvr79pcr.apps.googleusercontent.com">
        <button>
          <Google />
        </button>
      </GoogleOAuthProvider>
    </div>
  );
}

export default PruebaLogIn;
