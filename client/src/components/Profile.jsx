import React, { useState,createContext,useContext, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "./App";


const Profile = () => {
  const history = useHistory();
  const [userdata, setUserdata] = useState({});
  const {state,dispatch} = useContext(UserContext);

  const hiddenFileInput = React.useRef(null);
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  
  const handleChange = async (event) => {
    const userimage = event.target.files[0];
    const data = new FormData();
    data.append("userimage", userimage);

    await fetch("/profileimage", {
      method: "PUT",
      headers: {
        Authorization: "Bearer" + localStorage.getItem("jwt"),
      },
      body: data,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.errorMessage) {
          return toast.error(" Failed to upload pic");
        }
        setUserdata(result);
        toast.success(" 🎇 Profile pic Updated Successfully");
      });
  };



  useEffect(() => {
    // const isLogged = async () => {
    //   await fetch("/profile", {
    //     method: "GET",
    //     headers: {
    //       Authorization: "Bearer" + localStorage.getItem("jwt"),
    //       "Content-type": "application/json",
    //     },
    //     // credentials: "include",
    //   })
    //     .then((res) => res.json())
    //     .then((data) => {
    //       if (data.errorMessage) {
    //         toast.error(data.errorMessage);
    //         history.push("/login");
    //       } else {
    //         setUserdata(data);
    //       }
    //     });
    // };

    // isLogged();

    setUserdata(state);
  }, [history]);









  return (
    <>
      <div>
        <section id="head-section" className="d-flex align-items-center">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 mx-auto">
                <div className="row">
                  <div className="col-md-4 pt-3 mb-3 pt-lg-0 order-1 order-lg-1 d-flex justify-content-center flex-column">
                    <div>
                      <div className="container">
                        <div className="text-center">
                          <img
                            src={userdata.userImage}
                            alt="User"
                            className="rounded-circle btn-info"
                            width="200px"
                            height="200px"
                            border="5px "
                          />

                          <div className="m-3">
                            <h4>{userdata.username}</h4>
                          </div>

                          <button
                            onClick={handleClick}
                            className="btn btn-info"
                          >
                            <i className="fas fa-edit me-1"></i>Change Image
                          </button>
                          <form>
                            <input
                              type="file"
                              ref={hiddenFileInput}
                              name="profle"
                              data-max-size="2048"
                              onChange={handleChange}
                              style={{ display: "none" }}
                            />
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6 mt-4 mb-5 mx-auto order-2 order-lg-2 d-flex justify-content-center flex-column">
                    <div className="row m-1">
                      <div className="col-sm-3">
                        <h6 className="mb-0">UserName</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {userdata.username}
                      </div>
                    </div>
                    <hr className="hr-line" />
                    <div className="row m-1">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Email</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {userdata.email}
                      </div>
                    </div>
                    <hr className="hr-line" />

                    <div className="row m-1">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Mobile</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {userdata.mobile}
                      </div>
                    </div>
                    <hr className="hr-line" />

                    <div className="row m-1">
                      <div className="col-sm-3">
                        <h6 className="mb-0">DOB</h6>
                      </div>

                      <div className="col-sm-9 text-secondary">
                        {userdata.dob}
                      </div>
                    </div>

                    <hr className="hr-line" />

                    <div className="row m-1">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Gender</h6>
                      </div>

                      <div className="col-sm-9 text-secondary">
                        {userdata.gender}
                      </div>
                    </div>
                    <hr className="hr-line" />

                    <div className="row m-1">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Favorite Quote</h6>
                      </div>

                      <div className="col-sm-9 text-secondary">
                        {userdata.fav_quote}
                      </div>
                    </div>
                    <hr className="hr-line" />

                    <div className="row m-1">
                      <div className="col-sm-3">
                        <h6 className="mb-0">CreatedOn</h6>
                      </div>

                      <div className="col-sm-9 text-secondary">
                        {userdata.createdOn}
                      </div>
                    </div>

                    <hr className="hr-line" />
                    <div className="col-12">
                      <NavLink
                        exact
                        className="nav-link prof-btn text-center"
                        to="/updateUser"
                      >
                        {" "}
                        Update Account{" "}
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Profile;
