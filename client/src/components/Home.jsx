import React  from "react";
import pVideo from "./Images/hero-video.mp4";


const Home = () => {

 
   



  
  return (
    <>
      <div className="col-md-12 col-12 mx-auto my-auto">
      
        <div className="aspect-ratio">
          <video
            autoPlay={true}
            loop={true}
            muted={true}
            className="col-12 mx-auto my-auto"
          >
            <source src={pVideo} type="video/mp4" />
          </video>
        </div>



        <button className="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
      {/* <img src={state.userImage} 
      alt="User"
      className="rounded-circle btn-secondary"
      width="36px"
      height="36px"
      border="2px " />   */}

      </button>,





















      </div>
    </>
  );
};

export default Home;
