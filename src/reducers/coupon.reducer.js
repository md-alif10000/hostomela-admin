import { couponConstants } from "../actions/constants";

const initState = {
	coupons: [],
	loading: false,
};

export default (state = initState, action) => {
	switch (action.type) {
		case couponConstants.GET_ALL_COUPON_REQUEST:
			state = {
				...state,
				loading: true,
			};

		case couponConstants.GET_ALL_COUPON_SUCCESS:
			state = {
				...state,
				coupons: action.payload.coupons,
			};
			break;
		case couponConstants.GET_ALL_COUPON_FAILURE:
			state = { ...state, loading: false };
	}

	return state;
};
