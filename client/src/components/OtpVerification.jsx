import React, { useState  } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();





export default function OtpVerification() {

    const [otp, SetOtp] = useState();
    const history = useHistory();

    const sendData = async (e) => {
        e.preventDefault();
    
    
        await fetch("/verify-email", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            otp
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            // console.log(data);
            if (data.errorMessage) {
              toast.error(data.errorMessage);
         
            } else {
    
            ;
              toast.success("login Success")
              history.push("/login");
           
            }
          });
      };








    return (
        <div>






<div className="col-md-5 col-12 mx-auto align-items-center">
<div className="input-group">
  <span className=" m-2 p-2">
   
    <i className="fa fa-2x fa-envelope"></i>{" "}
  </span>
  <input
    type="text"
    onChange={(e) => SetOtp(e.target.value)}
    name="otp"
    className="form-control m-3 alert"
    placeholder="otp"
    aria-describedby="inputGroupPrepend"
    role="alert"
    required
  />

</div>


<button onClick={sendData}  className="btn btn-info align-items-center mx-auto"> verifyOtp </button>
</div>     
        </div>
    )
}
