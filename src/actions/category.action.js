import axios from "../helpers/axios";
import { authConstants, categoryConstants } from "./constants";
import Swal from "sweetalert2";

export const getAllCategory = () => {
	return async (dispatch) => {
		dispatch({ type: categoryConstants.GET_ALL_CATEGORIES_REQUEST });
		const res = await axios.get(`category/getcategory`);
		console.log(res);
		if (res.status === 200) {
			const { categoryList } = res.data;
			console.log(categoryList);

			dispatch({
				type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
				payload: { categories: categoryList },
			});
		} else {
			dispatch({
				type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
				payload: { error: res.data.error },
			});
		}
	};
};

export const addCategory = (form) => {
	return async (dispatch) => {
		dispatch({ type: categoryConstants.ADD_NEW_CATEGORY_REQUEST });
		try {
			const res = await axios.post("/category/create", form);

			console.log(res);
			if (res.status === 201) {
				dispatch({
					type: categoryConstants.ADD_NEW_CATEGORY_SUCCESS,
					payload: { category: res.data.category },
				});
				Swal.fire("Wow..", "Successfully added category...!", "success");
			} else {
				dispatch({
					type: categoryConstants.ADD_NEW_CATEGORY_FAILURE,
					payload: res.data.error,
				});
					Swal.fire("Opps..", "Something went wrong...!", "error");
			}
		} catch (error) {
			console.log(error.response);
		}
	};
};

export const updateCategories = (form) => {
	return async (dispatch) => {
		dispatch({ type: categoryConstants.UPDATE_CATEGORIES_REQUEST });
		const res = await axios.post("/category/update", form);

		console.log(res);
		if (res.status === 201) {
			dispatch({ type: categoryConstants.UPDATE_CATEGORIES_SUCCESS });
			dispatch(getAllCategory());
		} else {
			const { error } = res.data;

			dispatch({
				type: categoryConstants.UPDATE_CATEGORIES_FAILURE,
				payload: { error },
			});
			
		}
	};
};

export const deleteCategories = (ids) => {
	return async (dispatch) => {
		dispatch({type:categoryConstants.DELETE_CATEGORIES_REQUEST})
		const res = await axios.post("/category/delete", {
			payload: {
				ids,
			},
		});
		if (res.status == 202) {
			
			dispatch({type:categoryConstants.DELETE_CATEGORIES_SUCCESS})
			Swal.fire("Great..", "Successfully Deleted category...!", "success");
			dispatch(getAllCategory())
			
		} else {
			const {error}=res.data
			dispatch({
				type:categoryConstants.DELETE_CATEGORIES_FAILURE,
				payload:{error}
			})
				Swal.fire("Opps..", "Something Went Wrong.....!", "error");
			dispatch(getAllCategory())

		}
	};
};
