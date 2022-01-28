import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { UserContext } from "./App";

// import LogoutWithGoogle from "./LogoutwithGoogle";

const Navbar = () => {
  const history = useHistory();
  // const [email, setemail] = useState();
  // const [img, setimg] = useState();
  // const [name, setname] = useState();

  const { state, dispatch } = useContext(UserContext);

  // const isLogged = async () => {
  //   await fetch("http://localhost:3001/profile", {
  //     method: "GET",
  //     headers: {
  //       Authorization: "Bearer" + localStorage.getItem("jwt"),
  //       "Content-type": "application/json",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //      setname(res.username);
  //      setemail(res.email)
  //      setimg(res.userImage)

  //     });
  // };

  // useEffect(() => {
  //   isLogged();
  // }, []);

  const offset = () => {
    return [
      <button key={21}
        className="btn"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight"
        aria-controls="offcanvasRight"
      >
        <img key={22}
          src={state.userImage}
          alt="User"
          className="rounded-circle btn-secondary"
          width="36px"
          height="36px"
          border="2px "
        />
      </button>,

      <div key={19}
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header" key={20}>
          <button key={22}
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body" key={19}>
          <ul key={10}>
            <div>
              <div className="d-flex col-12 m-3 " key={23}>
                <div className="row col-5">
                  <div>
                    <img
                      src={state.userImage}
                      alt="User"
                      className="rounded-circle btn-info row"
                      width="75"
                      height="75"
                      border="2px"
                    />
                  </div>
                </div>

                <div className="row col-4" key={24}>
                  <h4>
                    <b> {state.username} </b>
                  </h4>
                  <p>{state.email}</p>
                </div>
              </div>

              <div className="d-flex col-12 m-2 " key={25}>
                <div className="row col-5 m-1 me-2">
                  <NavLink
                    exact
                    className="nav-link prof-btn"
                    to="/profile"
                    data-bs-dismiss="offcanvas"
                  >
                
                    My profile
                  </NavLink>
                </div>

                <div className="row col-5 m-1 ms-2" key={26}>
                  <button
                    onClick={() => {
                      localStorage.clear();
                      sessionStorage.clear();
                      dispatch({ type: "CLEAR" });
                      localStorage.removeItem("user");
                      history.push("/login");
                    }}
                    className="logt-btn"
                  >
                    Logout
                  </button>
                </div>
              </div>

              <div>
                <NavLink
                  exact
                  className="nav-link logt-btn"
                  to="/favorite"
                  data-bs-dismiss="offcanvas"
                >
           
                  Favorite
                </NavLink>
              </div>

              {/* ---------------- next  */}
            </div>
          </ul>
        </div>
      </div>,
    ];
  };

  const list = () => {
    if (state) {
      return [
        <li className="nav-item" key="1">
          <NavLink exact className="nav-link" to="/search" key={14}> 
            <i className="fas fa-search" key={13}></i>
          </NavLink>
        </li>,
        <li className="nav-item" key="2">
          <NavLink exact className="nav-link" to="/books" key={15}>
            Books
          </NavLink>
        </li>,
        <li key={3}>   <i key={20}> 
 {offset()  }
        </i>
          </li>,
      ];
    } else {
      return [
        <li className="nav-item" key="4">
          <NavLink exact className="nav-link " to="/" key={16} >
            Home
          </NavLink>
        </li>,
        <li className="nav-item" key="5">
          <NavLink
            exact
            className="nav-link"
            activeClassName="nav-active"
            to="/register"
          >
            Register
          </NavLink>
        </li>,

        <li className="nav-item" key="{6}" >
          <NavLink
            exact
            className="nav-link"
            activeClassName="nav-active"
            to="/login" 
          >
            Login
          </NavLink>
        </li>,
      ];
    }
  };
  return (

    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top ">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            <label className="animated ms-3 ">✏</label>
            <span className="covid-title">E-LearningApp</span>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"> </span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto me-3 " key={8}>
              {list()}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
