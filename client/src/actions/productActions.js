import {PRODUCT_LIST_FAILS , PRODUCT_LIST_REQUEST,PRODUCT_LIST_SUCCESS } from "../constants/productConstants"
import axios from "axios"
export const listProducts = () => async (dispatch ) => {
    try {
        dispatch({type: PRODUCT_LIST_REQUEST})
        const {data} = await axios.get("/all-books")
       

        dispatch({
            type :PRODUCT_LIST_SUCCESS,
            payload :data
        })
        
    } catch (error) {

        dispatch({
            type :PRODUCT_LIST_FAILS,
            payload :error.response  && error.response.data.message ? error.response.data.message : error.message
        })
        console.log(error);
    }
}