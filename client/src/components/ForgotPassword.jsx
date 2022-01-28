
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

 export default function  ForgotPassword(){

  const history = useHistory();

  const [email, setemail] = useState();
 
  const sendData = async (e) => {
    e.preventDefault();


    await fetch("/forgot-password", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email, 
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.errorMessage) {
          toast.error(data.errorMessage);
     
        } else {
          toast.info(data.message)
          history.push("/login");
       
        }
      });
  };

  return (
    <>
      <div className="App col-10 mx-auto">
        <form method="POST" className="from">
          <div class="container">
        


            <div className="col-md-5 register-main">
              <div className="input-group">
                <span className=" m-2 p-2">
                 
                  <i className="fa fa-2x fa-envelope"></i>{" "}
                </span>
                <input
                  type="email"
                  value={email}

                  onChange={(e) => setemail(e.target.value)}
                  name="email"
                  className="form-control m-3 alert"
                  placeholder="Email"
                  aria-describedby="inputGroupPrepend"
                  role="alert"
                  required
                />

              </div>

              <button
              type="submit"
              onClick={sendData}
              className="btn btn-info m-3 p-2 "
            >
            Reset Password
            </button>
            </div>











           
          
          </div>
        </form>
      </div>



    



    </>
  );
}


