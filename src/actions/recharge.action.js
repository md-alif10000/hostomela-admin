import axios from "../helpers/axios";
import { rechargeConstants } from "./constants";
import Swal from "sweetalert2";


// new action
export const getAllRecharges = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: rechargeConstants.GET_ALL_RECHARGE_REQUEST });
      const res = await axios.get(`/recharge/allRecharge`);
      if (res.status === 200) {
        const { recharges } = res.data;
        dispatch({
          type: rechargeConstants.GET_ALL_RECHARGE_SUCCESS,
          payload: { recharges },
        });
      } else {
        dispatch({ type: rechargeConstants.GET_ALL_RECHARGE_FAILURE });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateRecharge=(data)=>{
  return async (dispatch)=>{
    dispatch({type:rechargeConstants.UPDATE_RECHARGE_REQUEST})
       const res = await axios.put(`/recharge/update`,data);
           if (res.status === 201) {
             dispatch({
               type: rechargeConstants.UPDATE_RECHARGE_SUCCESS,
             });

                dispatch(getAllRecharges());
                      Swal.fire("Great.", "Updated Successfully....!", "success");
           } else {
             dispatch({ type: rechargeConstants.UPDATE_RECHARGE_FAILURE });
                   Swal.fire("Oops...", "Something went wrong.!", "error");
           }
  }
}

