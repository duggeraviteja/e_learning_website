import React, { useState, useContext } from "react";
import { useHistory,NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "./App";
import LoginwithGoogle from "./LoginwithGoogle";



toast.configure();

function Login() {
  const { dispatch } = useContext(UserContext);
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const history = useHistory();

  const [email, setemail] = useState();
  const [password, setpassword] = useState();

  const sendData = async (e) => {
    e.preventDefault();

    await fetch("/login", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errorMessage) {
          toast.error(data.errorMessage);
        } else {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch({ type: "USER", payload: data.user });
          //toast.success("login Success");
          toast.success('Successfully ',  {position: toast.POSITION.BOTTOM_RIGHT , autoClose:3000})

          history.push("/");
        }
      });
  };


 






  return (
    <>
      <div className="col-10 mx-auto m-3">
        <form method="POST" className="from">
          <div className="col-md-5 register-main">
            <div className="input-group">
              <span className=" m-2 p-2">
                <i className="fa fa-2x fa-envelope"></i>{" "}
              </span>
              <input
                type="email"
                onChange={(e) => setemail(e.target.value)}
                name="email"
                className="form-control m-3 alert"
                placeholder="Email"
                aria-describedby="inputGroupPrepend"
                role="alert"
                
              />
            </div>
          </div>

          <div className="col-md-5 register-main">
            <div className="input-group">
              <span className=" m-2 p-2">
                <i className="fa fa-2x fa-lock"></i>
              </span>
              <input
                type={passwordShown ? "text" : "password"}
                onChange={(e) => setpassword(e.target.value)}
                name="password"
                className="form-control m-3"
                placeholder="Password"
                aria-describedby="inputGroupPrepend"
                
              />
              <i
                  className="fa fa-2x fa-eye password-icon pe-3 mt-3"
                  onClick={togglePasswordVisiblity}
                />
            </div>
          </div>

          <div className="bt-reg  register-main col-4">
            <button
              type="submit"
              onClick={sendData}
              className="btn btn-success ps-4 pe-4"
            >
              Login
            </button>

            <NavLink className="re btn btn-info m-3" to="/forgot-password">
              ForgotPassword
            </NavLink>


            <div>
        <LoginwithGoogle /> 
        </div>

      

          
          </div>




 
        </form>


    



      </div>

   </>
  );
}

export default Login;
