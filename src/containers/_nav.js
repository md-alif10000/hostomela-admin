import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav = [
	{
		_tag: "CSidebarNavItem",
		name: "Dashboard",
		to: "/dashboard",
		icon: <CIcon name='cil-speedometer' customClasses='c-sidebar-nav-icon' />,
		badge: {
			color: "info",
			text: "NEW",
		},
	},
	{
		_tag: "CSidebarNavDropdown",
		name: "Products",
		route: "/products",
		icon: "cil-puzzle",
		_children: [
			{
				_tag: "CSidebarNavItem",
				name: "All Products",
				to: "/all-products",
			},
			{
				_tag: "CSidebarNavItem",
				name: "Add New Product",
				to: "/add-new-product",
			},
			{
				_tag: "CSidebarNavItem",
				name: "Stocked Out",
				to: "/stock-out-products",
				badge: {
					color: "danger",
					text: "Stockd-out",
				},
			},
		],
	},
	{
		_tag: "CSidebarNavItem",
		name: "Orders",
		to: "/orders",
		icon: <CIcon name='cil-speedometer' customClasses='c-sidebar-nav-icon' />,
	},
	{
		_tag: "CSidebarNavItem",
		name: "Categories",
		to: "/categories",
		icon: <CIcon name='cil-speedometer' customClasses='c-sidebar-nav-icon' />,
	},
	{
		_tag: "CSidebarNavItem",
		name: "Recharges",
		to: "/recharges",
		icon: <CIcon name='cil-speedometer' customClasses='c-sidebar-nav-icon' />,
	},
	{
		_tag: "CSidebarNavDropdown",
		name: "Tickets",
		route: "/tickets",
		icon: "cil-puzzle",
		_children: [
			{
				_tag: "CSidebarNavItem",
				name: "All Products",
				to: "/all-tickets",
			},
			{
				_tag: "CSidebarNavItem",
				name: "Add New Product",
				to: "/add-new-ticket",
			},
			{
				_tag: "CSidebarNavItem",
				name: "Stocked Out",
				to: "/booked-ticket",
				badge: {
					color: "danger",
					text: "Booked",
				},
			},
		],
	},

	{
		_tag: "CSidebarNavItem",
		name: "Users",
		to: "/users",
		icon: "cil-puzzle",
	},
	{
		_tag: "CSidebarNavItem",
		name: "Coupons",
		to: "/coupons",
		icon: "cil-puzzle",
	},
	{
		_tag: "CSidebarNavItem",
		name: "Gift Cards",
		to: "/gift_card",
		icon: "cil-puzzle",
	},
	{
		_tag: "CSidebarNavDropdown",
		name: "Sliders",
		route: "/sliders",
		icon: "cil-puzzle",
		_children: [
			{
				_tag: "CSidebarNavItem",
				name: "Customers",
				to: "/slider/home",
			},
			{
				_tag: "CSidebarNavItem",
				name: "Admins",
				to: "/slider/products",
			},
		],
	},

	{
		_tag: "CSidebarNavDropdown",
		name: "Pages",
		route: "/pages",
		icon: "cil-star",
		_children: [
			{
				_tag: "CSidebarNavItem",
				name: "Login",
				to: "/login",
			},
			{
				_tag: "CSidebarNavItem",
				name: "Register",
				to: "/register",
			},
			{
				_tag: "CSidebarNavItem",
				name: "Error 404",
				to: "/404",
			},
			{
				_tag: "CSidebarNavItem",
				name: "Error 500",
				to: "/500",
			},
		],
	},
];

export default _nav
