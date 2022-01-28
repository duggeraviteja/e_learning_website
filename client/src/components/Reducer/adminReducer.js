export const initialState = null ;

export const adminReducer = (state,action) =>{
    if(action.type ===  "ADMIN"){
        return action.payload
    }
    if(action.type === "CLEAR"){
        return null;
    }
    return state;
}