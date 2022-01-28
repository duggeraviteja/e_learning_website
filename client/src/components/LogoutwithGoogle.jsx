import React from "react";
import { GoogleLogout } from "react-google-login";

export default function LogoutwithGoogle() {
  const logout = () => {
    
  
    localStorage.clear();
    sessionStorage.clear();
    localStorage.removeItem('user')

  };
  return (
    <div>
      <GoogleLogout
        clientId="192103012114-k0tjg6b1i45mc91en74j6d54040mid5e.apps.googleusercontent.com"
        buttonText=""
        onLogoutSuccess={logout}
      ></GoogleLogout>
    </div>
  );
}
