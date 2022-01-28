import React ,{useEffect}from "react";
import {useHistory} from "react-router-dom";

const Logout = () =>{

const history = useHistory();

useEffect(() => {
     fetch("/logout", {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-type": "application/json"
        },
        credentials :"include"
      }).then((res)=>{

        history.push("/login",{replace:true});
        if(res.status !== 200){
            throw new Error();
        }
      }).catch((err) =>{
          console.log(err);
      });
    
});

    return(
        <>


<div><h1>
    
    </h1></div>


        </>
    )
}

export default Logout;