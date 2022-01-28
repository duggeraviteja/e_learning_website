import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
function Register() {
  
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const history = useHistory();
  const [user, setUser] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
    cpassword: "",
  });

  let name, value;

  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };











  const sendData = async (e) => {
    e.preventDefault();


    const { username, email, mobile, password, cpassword } = user;


     await fetch("/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
       },
      body: JSON.stringify({ username, email, mobile, password, cpassword }),
    }).then((res) => res.json())
      .then((data) => {
        if (data.errorMessage) {
          toast.error(data.errorMessage);
     
        } else {
          toast.success(data.message);
          history.push("/login");
        }
      });
  };


    

  return (
    <>
      <div className="col-12 mx-auto mt-4 ">
        <div className="col-6 col-12 mx-auto ">
          <form className="g-3 was-validated" method="POST" novalidate>

            <div className="col-md-5 register-main" >
              <div className="input-group">
                <span className=" m-2 p-2">
                  <i className="far fa-2x fa-user"></i>
                </span>
                <input 
                  type= "text"
                  pattern="[a-zA-Z0-9]+"
                  minLength="4"
                  maxLength="25"
                  value={user.username}
                  onChange={handleInput}
                  name="username"
                  className="form-control m-3 in "
                  placeholder="FullName"
                  aria-describedby="inputGroupPrepend"
                  role="alert"
                  autoFocus
                  required
                />
                
              </div>
            </div>

            <div className="col-md-5 register-main">
              <div className="input-group">
                <span className=" m-2 p-2">
                 
                  <i className="fa fa-2x fa-envelope"></i>{" "}
                </span>
                <input
                  type="email"
                  onChange={handleInput}
                  name="email"
                  className="form-control m-3 alert"
                  placeholder="Email"
                  aria-describedby="inputGroupPrepend"
                  role="alert"
                  required
                />

              </div>
            </div>

            <div className="col-md-5 col-12  mx-auto register-main">
              <div className="input-group">
                <span className=" m-2 p-2">
                 
                  <i className="fa fa-2x fa-phone"></i>
                </span>
                <input
                  type="tel"
                  pattern="[1-9]{1}[0-9]{9}"
                  maxLength="10"
                  onChange={handleInput}
                  name="mobile"
                  className="form-control m-3  "
                  placeholder="MobileNumber"
                  aria-describedby="inputGroupPrepend"
                  required
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
                  pattern="[a-zA-Z0-9]+"
                  minLength="6"
                  maxLength="24"
                  onChange={handleInput}
                  name="password"
                  className="form-control m-3"
                  placeholder="Password"
                  aria-describedby="inputGroupPrepend"
                  required
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
                  pattern="[a-zA-Z0-9]+"
                  minLength="6"
                  maxLength="30"
                  onChange={handleInput}
                  name="cpassword"
                  className="form-control m-3 in"
                  placeholder="Confrom password"
                  aria-describedby="inputGroupPrepend"
                  required
                />
                <i
                  className="fa fa-2x fa-eye password-icon pe-3 mt-3"
                  onClick={togglePasswordVisiblity}
                />
              </div>

            </div>
            <div className="bt-reg text-center mt-3 mb-3">

            <button type="submit" onClick={sendData} className="btn btn-dark p-2">
              Create Account 
            </button>
            </div>
           

          
          </form>
        </div>






        <div className=" form-group register-main">
    
            <p className="text-center">
              <Link className="re m-3 btn btn-success" to="/login">
                Log In
              </Link>
              <Link className="re btn btn-info m-3" to="/forgot-password">
               ForgotPassword
              </Link>
            </p>
            </div>
      </div>
    </>
  );
}
export default Register;
