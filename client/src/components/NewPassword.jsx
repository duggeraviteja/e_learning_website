
import React, { useState } from "react";
import { useHistory,useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

 export default function  NewPassword(){

  const history = useHistory();

  const [password, setPassword] = useState();
  const [cpassword, setcPassword] = useState();
  const {token} = useParams();
  console.log("use params token " + token);


  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

 
  const sendData = async (e) => {
    e.preventDefault();


    await fetch("/new-password", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body:JSON.stringify({
        password,
        cpassword, 
        token:token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.errorMessage) {
          toast.error(data.errorMessage);
     
        } else {
          toast.success(data.message)
          history.push("/login");
       
        }
      });
  };

  return (
    <>
      <div className="col-12 mx-auto">
        <form method="POST" className=" g-3 was-validated">
          <div class="container">
            



          <div className="col-md-5">
              <div className="input-group">
                <span className=" m-2 p-2">
                  <i className="fa fa-2x fa-lock"></i>
                </span>
                <input
                  type={passwordShown ? "text" : "password"}
                  // pattern="^(?=.*[a-z])(?=.*[0-9]).{6,24}$"

                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="form m-3"
                  placeholder="Enter new Password"
                  required
                />
               
              </div>
            </div>
            
          <div className="col-md-5">
              <div className="input-group">
                <span className=" m-2 p-2">
                  <i className="fa fa-2x fa-lock"></i>
                </span>
                <input
                  type={passwordShown ? "text" : "password"}
                  // pattern="^(?=.*[a-z])(?=.*[0-9]).{6,24}$"

                  name="cpassword"
                  onChange={(e) => setcPassword(e.target.value)}
                  value={cpassword}
                  className="form m-3 in"
                  placeholder=" Conform Password"
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
            Update password Password
            </button>
          </div>
        </form>
      </div>



    



    </>
  );
}


