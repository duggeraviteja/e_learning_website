import React, { useState } from "react";
import { Link } from "react-router-dom";


const Search = () => {
  const [search] = useState();

  const [book, setBook] = useState([]);
  

  const searchedBook = async (query) => {
    // GET request using fetch with async/await
    await fetch("/search", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        query,
      }),
    })
      .then((res) => res.json())
      .then((data) => {


        if(!data.errorMessage) {
          setBook(data);
        }
        
      });
  };

  return (
    <>
      <div className="container align-items-center text-center mx-auto mt-5 ">
        <div className=" col-md-4 col-12 mx-auto ">
          <form className="d-flex">
            <input
              className="form-control"
              value={search}
              type="text"
              onChange={(e) => searchedBook(e.target.value)}
              placeholder="Search Book"
              aria-label="Search"
              autoFocus
            />
          </form>

          <div>
            {book.map((k, i) => {
              const file = k.book;
              return (
                <div>
                  <Link
                    className="btn btn-warning preview m-2 p-2"
                    to={{
                      pathname: "/PdfReader",
                      file: {
                        file,
                      },
                    }}
                    exact
                  >
                   
                    {k.title} <span>View Book </span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
