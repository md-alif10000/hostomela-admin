import { rechargeConstants } from "../actions/constants";

const initState = {
  recharges: [],
  loading:false
};

export default (state = initState, action) => {
  switch (action.type) {
      case rechargeConstants.GET_ALL_RECHARGE_REQUEST:
          state={
              ...state,
              loading:true
          }

    case rechargeConstants.GET_ALL_RECHARGE_SUCCESS:
      state = {
        ...state,
        recharges: action.payload.recharges,
      };
      break;
      case rechargeConstants.GET_ALL_RECHARGE_FAILURE:
          state={...state,
        loading:false}
  }

  return state;
};
