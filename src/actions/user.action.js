import axios from "../helpers/axios";
import { userConstants,  } from "./constants";

export const register = (user) => {
    return async (dispatch) => {
      dispatch({type:userConstants.REGISTER_REQUEST})
    const res = await axios.post("/admin/register", {
      ...user,
    });

      if (res.status === 201) {
      
      const { message } = res.data;

      dispatch({
        type: userConstants.REGISTER_SUCCESS,
        payload: {message},
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: userConstants.REGISTER_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};


// export const getAllUsers=()=>{

//    return async (dispatch) => {
//      dispatch({ type: userConstants.REGISTER_REQUEST });
//      const res = await axios.post("/admin/getAllUsers", {
//        ...user,
//      });

//      if (res.status === 201) {
//        const { message } = res.data;

//        dispatch({
//          type: userConstants.REGISTER_SUCCESS,
//          payload: { message },
//        });
//      } else {
//        if (res.status === 400) {
//          dispatch({
//            type: userConstants.REGISTER_FAILURE,
//            payload: { error: res.data.error },
//          });
//        }
//      }
//    };

// }