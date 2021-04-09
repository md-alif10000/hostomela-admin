import axios from "../helpers/axios";
import { orderConstants } from "./constants";
import Swal from "sweetalert2";

export const getCustomerOrders = () => {
	return async (dispatch) => {
		dispatch({ type: orderConstants.GET_CUSTOMER_ORDER_REQUEST });
		try {
			const res = await axios.post("/order/getCustomerOrders");
			if (res.status === 200) {
				const { orders } = res.data;
				dispatch({
					type: orderConstants.GET_CUSTOMER_ORDER_SUCCESS,
					payload: { orders },
				});
			} else {
				const { error } = res.data;
				dispatch({
					type: orderConstants.GET_CUSTOMER_ORDER_FAILURE,
					payload: { error },
				});
			}
		} catch (error) {
			console.log(error);
		}
	};
};

export const updateOrder = (payload) => {
	return async (dispatch) => {
		dispatch({ type: orderConstants.UPDATE_CUSTOMER_ORDER_REQUEST });
		try {
			const res = await axios.post("/order/update", payload);
			if (res.status === 201) {
				dispatch({ type: orderConstants.UPDATE_CUSTOMER_ORDER_SUCCESS });
				dispatch(getCustomerOrders());
						Swal.fire("Great..", "Order Successfully Updated...!", "success");
			} else {
				const { error } = res.data;
				dispatch({
					type: orderConstants.UPDATE_CUSTOMER_ORDER_FAILURE,
					payload: { error },
				});
						Swal.fire("Opps..", "Something went wrong...!", "error");
			}
		} catch (error) {
			console.log(error);
		}
	};
};
