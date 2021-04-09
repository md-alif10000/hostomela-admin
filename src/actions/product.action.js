import axios from "../helpers/axios";
import { productConstants } from "./constants";
import Swal from "sweetalert2";

// new action
export const getProducts = () => {
	return async (dispatch) => {
		try {
			dispatch({ type: productConstants.GET_ALL_PRODUCTS_REQUEST });
			const res = await axios.get(`/getAllProducts`);
			if (res.status === 200) {
				const { products } = res.data;
				dispatch({
					type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
					payload: { products },
				});
			
			} else {
				dispatch({ type: productConstants.GET_ALL_PRODUCTS_FAILURE });
		
			}
		} catch (error) {
			console.log(error);
		}
	};
};

// modified actrion
export const addProduct = (form) => {
	return async (dispatch) => {
		try {
			console.log(form)
			dispatch({ type: productConstants.ADD_PRODUCT_REQUEST });
			const res = await axios.post(`product/create`, form);
			if (res.status == 201) {
				dispatch({ type: productConstants.ADD_PRODUCT_SUCCESS });
				Swal.fire("Great...", "Product added successfully...!", "success");
				dispatch(getProducts());
			} else {
				dispatch({ type: productConstants.ADD_PRODUCT_FAILURE });

				Swal.fire("Oops...", "Something went wrong.!", "error");
			}
		} catch (error) {
			console.log(error);
		}
	};
};

// new action
export const deleteProductById = (payload) => {
	console.log(payload)
	return async (dispatch) => {
		try {
			   const res = await axios.delete(`product/deleteProductById`, {
           data: { payload },
         });
			dispatch({ type: productConstants.DELETE_PRODUCT_BY_ID_REQUEST });
			if (res.status === 202) {
				dispatch({ type: productConstants.DELETE_PRODUCT_BY_ID_SUCCESS });
					Swal.fire("Great...", "Product deleted successfully.!", "success");
				dispatch(getProducts());
			} else {
				const { error } = res.data;
				dispatch({
					type: productConstants.DELETE_PRODUCT_BY_ID_FAILURE,
					payload: {
						error,
					},
				});
					Swal.fire("Opps..", "Something went wrong...!", "error");
			}
		} catch (error) {
			console.log(error);
					Swal.fire("Opps..", "Something went wrong...!", "error");
		}
	};
};
