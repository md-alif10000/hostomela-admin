import React from 'react';





const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));

const User = React.lazy(() => import('./views/users/User'));
const AllProducts = React.lazy(() => import("./views/products/AllProducts/index"));
const AddNewProducts = React.lazy(() => import("./views/products/AddNewProducts/index2"));
const Categories = React.lazy(() =>import("./views/categories"));
const Orders = React.lazy(() =>import("./views/orders/index2"));
const Coupons = React.lazy(() => import("./views/coupons/index"));
const GiftCard = React.lazy(() => import("./views/giftCard/index"));

const ERROR404 = React.lazy(() => import("./views/pages/page404/Page404"));

  



const routes = [
	{ path: "/", exact: true, name: "Home" },
	{ path: "/dashboard", name: "Dashboard", component: Dashboard },
	{ path: "/products", name: "Theme", component: AllProducts, exact: true },
	{ path: "/all-products", name: "All Products", component: AllProducts },
	{
		path: "/add-new-product",
		name: "Add New Products",
		component: AddNewProducts,
	},
	{
		path: "/categories",
		name: "Categories",
		component: Categories,
	},
	{
		path: "/orders",
		name: "Orders",
		component: Orders,
	},
	{
		path: "/users",
		name: "All Users",
		component: User,
	},

	{
		path: "/coupons",
		name: "Coupons",
		component: Coupons,
	},
	{
		path: "/gift_card",
		name: "Gift Card",
		component: GiftCard,
	},

	{
		path: "/:",
		name: "All Users",
		component: ERROR404,
	},
];

export default routes;
