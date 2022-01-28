
import {PRODUCT_LIST_FAILS,PRODUCT_LIST_SUCCESS,PRODUCT_LIST_REQUEST} from '../../constants/productConstants'
import {CART_ADD_ITEM,CART_REMOVE_ITEM} from '../../constants/productConstants'




export const BooksListReducer = (state = {products:[]},action) =>{
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return  {loading:true,products: []};
        case PRODUCT_LIST_SUCCESS: 
        return { loading:false,products : action.payload}
        case PRODUCT_LIST_FAILS: 
        return { loading:false,error : action.payload}
    
        default:
            return state;
    }
}



export const cartReducer  = ( state ={cartItems :[]} ,action) =>{
    switch(action.type){
        case CART_ADD_ITEM :
            const item  = action.payload
            const exitItem = state.cartItems.find(x => x.product === item.product)
            if(exitItem){  
                return {
                    ...state,
                cartItems : state.cartItems.map(x => x.product === exitItem.product ? item:x)
 
                } 
            } else {    
                return  {  ...state,cartItems:[...state.cartItems ,item] 

                }
            }

            case CART_REMOVE_ITEM: 
            return { ...state,
            cartItems : state.cartItems.filter(x=>x.product !== action.payload)
        }


            default : return state;
    }
}






