import React, { useState ,useEffect } from 'react';
import { useLocation,useHistory,useParams} from "react-router-dom"

const PdfReader = (props) => {

  const { file } = useParams();
  console.log(file);


  const [state, setstate] = useState()
  let location = useLocation();
  const history = useHistory();

  

  useEffect(() => {
    const  FileSetter =()=>{
      const book = location.file
      if(!book){
       return history.push("/books")
      }
      setstate(book.file)
  
       }
    
    FileSetter()
  }, [history , location.file]);



  return (
    <>
<div>



   <div className=" me-2 col-md-12 col-12 text-center align-items-center  ">


      <iframe src={`${state}#view=fitH`} title="Pdf" height="650px"   className='pdf-view col-md-10 col-12 me-2 p-1' />



    </div> 



    

    </div>
    </>
  );
};

export default PdfReader;
