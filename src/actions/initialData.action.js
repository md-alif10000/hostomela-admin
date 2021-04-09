import axios from "../helpers/axios"
import { categoryConstants, initialDataConstants, orderConstants, productConstants,ge, getUsers, rechargeConstants } from "./constants"

export const getInitialData=()=>{
    return async dispatch=>{
        dispatch({type:initialDataConstants.GET_ALL_INITIAL_DATA_REQUEST})
        const res=await axios.post('/initialdata')
        
        if(res.status===200){
            const {products,categories,orders,users,recharges}=res.data;
            
            dispatch({
                type:categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
                payload:{categories}
            });

            dispatch({
                type:productConstants.GET_ALL_PRODUCTS_SUCCESS,
                payload:{products}

            })
            dispatch({
                type:orderConstants.GET_CUSTOMER_ORDER_SUCCESS,
                payload:{orders}
            })
              dispatch({
                type: getUsers.GET_ALL_USERS_SUCCESS,
                payload: { users },
              });
              dispatch({
                type: rechargeConstants.GET_ALL_RECHARGE_SUCCESS,
                payload: { recharges },
              });



        }
    }
}