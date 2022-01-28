import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "./App";

import { HashLoader } from "react-spinners";

import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";

function Books(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  const booksList = useSelector((state) => state.productList);
  const { loading, error, products } = booksList;

  const { state } = useContext(UserContext);

  const [value, setValue] = useState([]);
  // Like Book

  const likeBook = async (id) => {
    await fetch("/like", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer" + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        likedId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newdata = value.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setValue(newdata);
      });
  };

  // Unlike The liked Book

  const unLikeBook = (id) => {
    fetch("/unlike", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer" + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        likedId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newdata = value.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setValue(newdata);

        if (result.errorMessage) {
          toast.error(result.errorMessage);
          history.push("/login");
        }
        toast.error(result);
      });
  };

  const addtoReadList = async (id) => {
    toast.success("Successfully added to ReadingList", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 2000,
      theme: "color",
    });
    history.push(`/favorite/${id}`);
  };

  const makeComment = async (id) => {
    //  const {data} = await axios.get(`/books/${id}`)

    history.push(`/comments/${id}`);
  };

  useEffect(() => {
    // isLogged();

    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <div>
        {loading ? (
          <div className="loader">
            <HashLoader size={300} color="#4A90E2" />
          </div>
        ) : error ? (
          toast.warning(error)
        ) : (
          <div className="container-fluid col-12 mx-auto justify-items m-2">
            <div className="row gy-3" key="1">
              {products.map((curEle, index) => {
                const file = curEle.book;

                return (
                  <div className="col-md-3  mx-auto " key={index + index}>
                    <div className="card" key={index}>
                      <div className="container-fluid m-2">
                        <img
                          src={curEle.bookImage}
                          style={{ border: "red !important", height: "12rem" }}
                          alt="CoverImage"
                          className="card-img-top"
                        />
                        <div className="top-right">
                          <i
                            className="far fa-3x fa-arrow-alt-circle-down"
                            title="Add to ReadingList"
                            onClick={() => addtoReadList(curEle._id)}
                          ></i>
                        </div>
                      </div>
                      <div>
                        <div>
                          {" "}
                          <b className="state-bgm m-1">
                            <span> BookName : </span> {curEle.title}
                          </b>{" "}
                        </div>

                        <b className="state-bgm m-1 ">
                          <span> Author : </span> {curEle.author}
                        </b>
                      </div>

                      <div className="container-fluid d-flex  m-2">
                        <div className="row col-4 like m-2 ">
                          {curEle.likes.includes(state._id) ? (
                            <i
                              className="fas fa-2x fa-heart "
                              title="Unlike"
                              style={{
                                transition: "3s",
                                color: "red",
                                cursor: "pointer",
                              }}
                              onClick={() => unLikeBook(curEle._id)}
                            ></i>
                          ) : (
                            <i
                              className="fas fa-2x fa-heart "
                              title="Like"
                              style={{
                                transition: "3s",
                                color: "#2bcbba",
                                cursor: "pointer",
                              }}
                              onClick={() => likeBook(curEle._id)}
                            ></i>
                          )}

                          <div className="row col-3 like m-2">
                            <b className=" ">{curEle.likes.length}</b>
                          </div>
                        </div>

                        <div className="row like col-4 like-box">
                          <i
                            onClick={() => makeComment(curEle._id)}
                            className="fas fa-2x fa-comments m-2"
                            title="comment"
                            style={{ color: "#f7b731", cursor: "pointer" }}
                          >
                            <span></span>
                          </i>
                        </div>
                      </div>

                      <Link
                        className="btn btn-info preview"
                        to={{
                          pathname: "/PdfReader",
                          file: {
                            file,
                          },
                        }}
                      >
                        Preview Book
                      </Link>

                      {/* card ending */}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Books;
