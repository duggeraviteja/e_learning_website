import React,{useEffect , createContext , useReducer , useContext} from "react";
import Register from "./Register"
import Navbar from "./Navbar";
import Home from "./Home";
import Profile from "./Profile";
import Login from "./Login";
import Logout from "./Logout";
import Favorite from "./Favorite";
import {Switch,Route, BrowserRouter, useHistory} from "react-router-dom";
import "./styles.css";

import UploadBooks from "./adminComponents/UploadBooks";
import LoginForAdmin from "./LoginForAdmin";
import OtpVerification from "./OtpVerification";
import UpdateUser from "./UpdateUser";
import Comments from "./Comments";

import Books from "./Books";
import PdfReader from "./PdfReader";
import Search from "./Search";
import ForgotPassword from "./ForgotPassword";
import NewPassword from "./NewPassword";
import {initialState, reducer} from "./Reducer/userReducer";



export const UserContext = createContext();
export const cartContext = createContext();






const Routing= () =>{

  const history = useHistory(); 
  const {dispatch} = useContext(UserContext);





  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
    }else{
      if(!history.location.pathname.startsWith('/forgot-password') )
           history.push('/login')
    }
  },[dispatch , history])




// const imp = ()=>{
//     const user = JSON.parse(localStorage.getItem("user"));
//     if(user){
//       dispatch({type:"USER",payload:user })
//       history.push("/");
// } else{  
// history.push("/login")
// }
//   }
//   useEffect(()=>{
//     imp();
//   },[]);
  return(
    <Switch>

      
    
    <Route exact path="/" > <Home />  </Route>
    <Route exact path="/register" ><Register />  </Route>
    <Route exact path="/profile"> <Profile />  </Route>
    <Route exact path="/login"  > <Login />  </Route>
    <Route exact path="/logout" > <Logout />  </Route>
    <Route exact path="/books"  > <Books />  </Route>
    <Route exact path="/updateuser" > <UpdateUser />  </Route> 
    <Route exact path="/uploadbooks" > <UploadBooks />  </Route>
    <Route exact path="/favorite/:id" > <Favorite />  </Route>
    <Route exact path="/favorite" > <Favorite />  </Route>
    <Route exact path="/comments/:id" > <Comments />  </Route>
    <Route exact path="/comments" > <Comments />  </Route>





 


    {/* <Route path="/pdf/:name" exact component={MoreInformation} /> */}

    <Route exact path="/forgot-password" > <ForgotPassword />  </Route>
    <Route exact path="/forgot-password/:token">  <NewPassword /> </Route>


        {/* <Route exact path="/forgot-password/:token" component={NewPassword} /> */}
    <Route exact path="/search" > <Search /> </Route>

    <Route exact path="/admin-login"  > <LoginForAdmin /> </Route>
    <Route exact path="/otp-verify" > <OtpVerification /> </Route>

    <Route exact path="/pdfreader/"> <PdfReader />  </Route>



    </Switch>
  );
}


function App() {
 

 
  const [state,dispatch] = useReducer(reducer,initialState); 


 
  return (
    <div className="App">

      <UserContext.Provider value={{state,dispatch}} > 
      <BrowserRouter>
      <Navbar />
      <Routing />
      
    </BrowserRouter>
      </UserContext.Provider>

    </div>
  );
}

export default App;
