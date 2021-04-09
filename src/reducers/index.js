import { combineReducers } from "redux";
import authReducer from "./auth.reducers";
import userReducer from "./user.reducer.js";
import productReducer from './product.reducer.js'
import orderReducer from "./order.reducer";
import categoryReducer from "./category.reducer";
import pageReducer from "./page.reducer.js";
import getUsersReducer from './getUsers.reducer'
import rechargeReducer from './recharges.reducer'
 import sidebar from './sedebar.reducer'
 import couponReducer from './coupon.reducer'




const rootReducer = combineReducers({
	sidebarShow: sidebar,
	auth: authReducer,
	user: userReducer,
	category: categoryReducer,
	product: productReducer,
	page: pageReducer,
	order: orderReducer,
	AllUsers: getUsersReducer,
	recharges: rechargeReducer,
	coupons: couponReducer,
});


export default rootReducer