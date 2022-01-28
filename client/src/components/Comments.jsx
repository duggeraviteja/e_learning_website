import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Comments(props) {
  const { id } = useParams();
  const [state, setstate] = useState([])



 


  const makeComment = async (value,id) => {
    // console.log(value);
    // console.log(id);

    await fetch("/comment", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer" + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        likedId: id,
        value:value
      }),
    }).then((res)=>res.json()).then(
        (result) =>{
            console.log(result.comments);
            setstate(result.comments);
        }
    )
  };












  useEffect(() => {
    const readData = async () => {
      const { data } = await axios.get(`/books/${id}`);
      setstate(data.comments);
    };
    readData(id);
  }, [id]);

  return (
    <div className="m-3 align-items-center">

{
    (state <= 0) ? <h3 className="m-3">No Comments add Your Comments </h3> : <h3>Comments</h3>
}
  
              {
              state.map(i =>
                

               <div className="m-3">
                   <h3>{i.text}</h3>
                  <i> {i.name}   </i>  
                  <span > {i.uploadedDate}</span>
              </div>)
              } 
        



      <div className="ms-3 col-12 text-center  align-items-center mx-auto my-auto">
        <div className=" col-10 col-md-6 ">
          <form onSubmit={(e)=>{
              e.preventDefault();

              makeComment(e.target[0].value, id)
          }}>  
            <textarea className="form-control p-4" 
            > write here</textarea>
             <button
              type="submit"
              className="btn btn-info m-3 p-2 "
            >
              Add a comment
            </button>
          
          </form>

         
        </div>
      </div>
    </div>
  );
}

export default Comments;
