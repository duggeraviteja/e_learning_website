import { createStore } from 'redux'
import { applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension"
import { combineReducers } from 'redux';
import { BooksListReducer ,cartReducer} from "./bookReducer"



 const cartItemfromStorage  = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem('cartItems')) : [];
const reducer = combineReducers({
    productList : BooksListReducer,
    cart:cartReducer,
})
const initialState = {
    cart: {cartItems :cartItemfromStorage}
};

const middleware = [thunk]

const store = createStore (
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;