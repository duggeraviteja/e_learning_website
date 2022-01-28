import axios from "axios"

import { CART_ADD_ITEM,CART_REMOVE_ITEM } from '../constants/productConstants'

export const addToCart = (id)=> async(dispatch,getState) =>{
    const {data} = await axios.get(`/books/${id}`)

    dispatch({
        type:CART_ADD_ITEM,
        payload : {
            product:data._id,
            title:data.title,
            likes : data.likes,
            author:data.author,
            book : data.book,
            bookImage : data.bookImage
        }
    })

    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch,getState)=>{
    dispatch({
        type:CART_REMOVE_ITEM, payload:id
    });
    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))

}