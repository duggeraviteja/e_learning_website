import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import { toast } from "react-toastify";

import { addToCart, removeFromCart } from "../actions/cartAction";
import { useDispatch, useSelector } from "react-redux";

export default function Favorite({ match, location, history }) {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;



  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id));
    }
  }, [dispatch, id]);



  const removeItemCart = (id) => {
    toast.warn('Successfully Removed from Cart',  {position: toast.POSITION.BOTTOM_RIGHT , autoClose:3000 , theme: "colored"})

    dispatch(removeFromCart(id))
  } 

  return (
    <>
      <div className="ms-2 container-fluid">
        <div className="row gy-3">

        {
          (cartItems.length !== 0) ? 
        
             cartItems.map((k, i) => {
            const  file = k.book
            return (
              <div className="col-md-3  mx-auto " key={i}>
                <div className="card ">
                  <div className="container-fluid">
                    <img
                      src={k.bookImage}
                      style={{ border: "red !important", height: "14rem" }}
                      alt="CoverImage"
                      className="card-img-top"
                    />
                     <div className="top-right"> 

  </div>

                    <b className=" m-2 p-2">
                      <span> BookName : </span> {k.title}
                    </b>
                    <b className=" m-2 p-2 ">
                      <span> Author : </span> {k.author}
                    </b>

                    <Link
                      className="btn btn-info preview m-2"
                      to={{
                        pathname: "/PdfReader",
                        file: {
                          file
                        },
                      }}
                    
                    >
                      Continue Reading
                    </Link>

                    <i className="far fa-trash-alt m-2" cursor="pointer" title="Remove from cart"  onClick={() => removeItemCart(k.product)} ></i>

                  </div>
                </div>
              </div>
            );
          })
          :

          <div className="  align-items-center text-center">
              <h2 className=" ms-5 btn-info text-center" > *** No items in cart  ***</h2> 
          </div>
       
        }












        </div>
      </div>
    </>
  );
}
