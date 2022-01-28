import React, { useState }  from "react";
import { useHistory } from "react-router-dom";
// import {useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

    
  
const UploadBooks = ()=>{
  const history = useHistory();


    const [book,setBook] = useState();
    const [bookImage,setBookImage] = useState();
    const [title,setTitle] = useState("");
    const [author,Setauthor] = useState("");



 
    const onSubmitHandler =async (e)=>{
      const data = new FormData();

      data.append('file',book);
      data.append('title',title);
      data.append('author',author);
      data.append('bookImage',bookImage);


      await fetch("http://localhost:3001/uploadbooks",{
          method:"POST",
          body:data,
       
      })
      .then((res) => res.json())
      .then((data)=>{
        
          console.log(data);

          if(data.message) {
            toast(data.message);
            history.goBack("/uploadbooks")

        } else{
            toast.error(data.errorMessage);
        }
      }).catch((err)=>{
          toast.error(data.errorMessage);
      })

  }

 return(
 <>


<div className="text-center  mx-auto">

  <h1>upload pdf pageee </h1>


  <form onSubmit={onSubmitHandler} method="POST" encType="multipart/form-data"> 

      <input type="text " name="title"   onChange={(e) => setTitle(e.target.value)}   placeholder="title"/>
       <br/> <br/>
      <input type="text " name="author"  onChange={(e) => Setauthor(e.target.value)}  placeholder="Author"/> 
       <br/> <br/>

       <label>BookImage</label>
  <input type="file"  name="bookImage"  onChange={(e) => setBookImage(e.target.files[0])} /><br/>  <br/> 


  <label>Book</label>
  <input type="file" name="book" onChange={(e) => setBook(e.target.files[0])}  /> <br/>  <br/>



  <button className="btn btn-warning">submit</button>

</form>
</div>
        </>
    );
}


export default UploadBooks;