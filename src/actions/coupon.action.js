import axios from "../helpers/axios";

import { couponConstants } from "./constants";

export const getAllCoupon = () => {
	return async (dispatch) => {
		try {
			// dispatch({ type: couponConstants.GET_ALL_COUPON_REQUEST });
			const res = await axios.get("/coupon/allCoupon");
			if (res.status === 200) {
				const { coupons } = res.data;

				dispatch({
					type: couponConstants.GET_ALL_COUPON_SUCCESS,
					payload: { coupons },
				});
			} else {
				dispatch({ type: couponConstants.GET_ALL_COUPON_FAILURE });
			}
		} catch (error) {
			console.log(error);
		}
	};
};

export const addCoupon = (data) => {
	return async (dispatch) => {
		try {
			dispatch({ type: couponConstants.ADD_NEW_COUPON_REQUEST });
			const res = await axios.post(`/coupon/addCoupon`, data);
			if (res.status === 201) {
				const { coupon } = res.data;
				dispatch({
					type: couponConstants.ADD_NEW_COUPON_SUCCESS,
					payload: { coupon },
				});
			} else {
				dispatch({ type: couponConstants.ADD_NEW_COUPON_FAILURE });
			}
		} catch (error) {
			console.log(error);
		}
	};
};

export const deleteCoupon = (data) => {
	console.log("Delete data", data);

	return async (dispatch) => {
		try {
			dispatch({ type: couponConstants.DELETE_COUPON_REQUEST });
		const res = await axios.delete("/coupon/deleteCoupon", {data});
			if (res.status === 200) {
				const { coupon } = res.data;
				dispatch({
					type: couponConstants.DELETE_COUPON_SUCCESS,
					payload: { coupon },
				});
			} else {
				dispatch({ type: couponConstants.DELETE_COUPON_FAILURE });
			}
		} catch (error) {
			console.log(error);
			dispatch({ type: couponConstants.DELETE_COUPON_FAILURE });
		}
	};
};
