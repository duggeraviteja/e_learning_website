import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { GoogleLogin } from 'react-google-login';

import { UserContext } from "./App";



toast.configure();


export default function LoginwithGoogle() {

  const {  dispatch } = useContext(UserContext);
  const history = useHistory();



    const responseGoogle =async (response) => {
        console.log(response);
        console.log(response.profileObj);


        await fetch("/loginwithgoogle", {
            method: "POST",
            headers: {
              "Accept": "application/json",
              "Content-type": "application/json",
            },
            body: JSON.stringify({
             data :response.profileObj
            }),
          })
          .then((res) => res.json())
      .then((data) => {
        // console.log(data);


        response = "null";
        if (data.errorMessage) {
          return toast.error(data.errorMessage);
        } else {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch({ type: "USER", payload: data.user });
          toast.success("login Success");
         return history.push("/");
        }
      });

}


    return (
        <>
        <div>
    <GoogleLogin 
    clientId="192103012114-k0tjg6b1i45mc91en74j6d54040mid5e.apps.googleusercontent.com"
    buttonText="Login With Google"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
    theme={"dark"}


  
  />
            
        </div>
        </>
    )
}
