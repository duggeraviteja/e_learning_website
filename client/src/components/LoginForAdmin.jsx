import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "./App";

toast.configure();

const LoginForAdmin = () => {
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

    await fetch("/admin-login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.errorMessage) {
          toast.error(data.errorMessage);
        } else {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch({ type: "USER", payload: data.user });
          toast.success("login Success");
          history.push("/uploadbooks");
        }
      });
  };

  return (
    <>
      <div className="container-flex">
        <form method="POST" className="from">
          <div class="container">
            <div className="col-md-5">
              <h1>Admin Portal</h1>
              <div className="input">
                <span className=" m-2 p-2">
                  <i className="fa fa-2x fa-envelope"></i>
                </span>
                <input
                  type="email"
                  onChange={(e) => setemail(e.target.value)}
                  name="email"
                  value={email}
                  className="form m-3"
                  placeholder="Email"
                  role="alert"
                  required
                />
              </div>
            </div>

            <div className="col-md-5">
              <div className="input">
                <span className=" m-2 p-2">
                  <i className="fa fa-2x fa-lock"></i>
                </span>
                <input
                  type={passwordShown ? "text" : "password"}
                  // pattern="^(?=.*[a-z])(?=.*[0-9]).{6,24}$"

                  name="password"
                  onChange={(e) => setpassword(e.target.value)}
                  value={password}
                  className="for m-3"
                  placeholder="Password"
                  required
                />
                <i
                  className="fa fa-2x fa-eye password-icon pe-3 mt-3"
                  onClick={togglePasswordVisiblity}
                />
              </div>
            </div>

            <button
              type="submit"
              onClick={sendData}
              className="btn btn-success"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginForAdmin;
