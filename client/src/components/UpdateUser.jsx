import React, { useState,useEffect } from "react";
import {  useHistory } from "react-router-dom";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



toast.configure();

function UpdateUser() {
  const history = useHistory();

  const [user, setUser] = useState({
    username: "",
    mobile: "",
    dob: "",
    gender: "",
    fav_quote:" ",
  });

  const [state, setstate] = useState([])






   //console.log(state);

  



  const sendData = async (e) => {
    e.preventDefault();
    const { username, mobile, dob, gender,fav_quote } = user;


    await fetch("/updateUser", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer" + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({ username, mobile,dob,gender,fav_quote }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.errorMessage) {
          toast.error(data.errorMessage);
        } else {
          toast.success(data.message);
         history.push("/profile");
        }
      });
  };


  useEffect(() => {
   const  getdata = async()=> {

    await fetch("/profile", {
      method: "GET",
      headers: {
        Authorization: "Bearer" + localStorage.getItem("jwt"),
        "Content-type": "application/json",
      },
      // credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
          setstate(data);
  
      });
      }
    

      getdata();   
    
  }, [history])



  return (
    <>
      <div className="col-12 mx-auto mt-4 ">
        
        <div className="col-12 mx-auto ">


          
          <form className="g-3 was-validated" method="POST" novalidate>


            <div className="col-md-5 register-main">
              <div className="input-group">
                <span className=" m-2 p-2">
                 <h3> UserName : </h3> 
                </span>
                <input
                Value = {state.username}
                  type="text"
                  pattern="[a-zA-Z0-9]+"
                  minLength="4"
                  maxLength="25"
                  onChange={(e) => setUser( { ...user, username : e.target.value } )}
                  className="form-control m-3 in "
                  placeholder="FullName"
                  aria-describedby="inputGroupPrepend"
                  autoFocus
                  required
                />
              </div>
            </div>




            <div className="col-md-5 col-12  mx-auto register-main">
              <div className="input-group">
              <span className=" m-2 p-2">
                 <h3> Mobile : </h3> 
                </span>
                <input
                  Value = {state.mobile}
                  type="tel"
                  pattern="[1-9]{1}[0-9]{9}"
                  maxLength="10"
                  onChange={(e) => setUser( { ...user, mobile : e.target.value } )}                  name="mobile"
                  className="form-control m-3  "
                  placeholder="MobileNumber"
                  aria-describedby="inputGroupPrepend"
                  required
                />
              </div>
            </div>

            <div className="col-md-5 col-12  mx-auto register-main">
              <div className="input-group">
              <span className=" m-2 p-2">
                 <h3> Dob : </h3> 
                </span>

                <input
                  Value = {state.dob}
                  type="date"
                  onChange={(e) => setUser( { ...user, dob : e.target.value } )}                  name="dob"
                  className="form-control m-3   "
                  placeholder="Date Of Birth "
                  aria-describedby="inputGroupPrepend" 
                  required
                />
              </div>
            </div>

            <div className="col-md-5 col-12 register-main mx-auto d-flex ">
              <div className="input-group  ">
              <span className=" m-2 p-2">
                 <h3> Gender : </h3> 
                </span>
              </div>

              <div className="container d-flex  col-9">
                <div className=" row col-3  m-1 float-left ">
                  <input
                    type="radio"
                    id="male"
                    onChange={(e) => setUser( { ...user, gender : e.target.value } )}                    name="radio"
                    value="male"
                    title="male"
                  />
                  <label For="male">
                    <i className="fas fa-male"></i>
                  </label>
                </div>
                <div className="row col-3 m-1 ">
                  <input
                    type="radio"
                    id="female"
                    value="female"
                    title="female"
                    onChange={(e) => setUser( { ...user, gender : e.target.value } )}                    name="radio"
                  />
                  <label For="female">
                    <i className="fas fa-female"></i>
                  </label>
                </div>

                <div className="row col-3 m-1">
                  <input
                    type="radio"
                    id="other"
                    value="other"
                    name="radio"
                    title="other"
                    onChange={(e) => setUser( { ...user, gender : e.target.value } )}                  />
                  <label For="other">
                    <i className="fas fa-transgender-alt"></i>
                  </label>
                </div>
              </div>
            </div>



            <div className="col-md-5 col-12  mx-auto register-main">
              <div className="input-group">
              <span className=" m-2 p-2">
                 <h3> FavoriteQuote : </h3> 
                </span>




                <textarea className="form-control"
                  Value = {state.fav_quote}
                onChange={(e) => setUser( { ...user, fav_quote : e.target.value } )}  
                
                
                >Write here </textarea>

                {/* <input
                  type="date"
                  onChange={(e) => setUser( { ...user, dob : e.target.value } )}                  name="dob"
                  className="form-control m-3  "
                  placeholder="Date Of Birth "
                  aria-describedby="inputGroupPrepend" 
                  required
                /> */}
              </div>
            </div>

           

            <div className="bt-reg text-center mt-3 mb-3">
              <button
                type="submit"
                onClick={sendData}
                className="btn btn-dark p-2"
              >
                Update Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default UpdateUser;
