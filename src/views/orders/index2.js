import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generatePublicUrl } from "src/urlconfig";
import { updateOrder } from "../../actions";
import Card from "../components/UI/Card";

import "./style.css";

/**
 * @author
 * @function Orders
 **/

const Orders = (props) => {
	const order = useSelector((state) => state.order);
	const [display, setDisplay] = useState(false);
	const [type, setType] = useState("");
	const dispatch = useDispatch();

	const onOrderUpdate = (orderId) => {
		const payload = {
			orderId,
			type,
		};
		dispatch(updateOrder(payload));
	};

	const formatDate = (date) => {
		if (date) {
			const d = new Date(date);
			return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
		}
		return "";
	};

	const getStatus = (status) => {

		let result = status.filter(obj => {
			return obj.isCompleted === true;
		});


		return result[result.length - 1].type;
	};

	return (
		<>
			{order.orders.map((orderItem, index) => (
				<Card
					style={{
						margin: "10px 0",
					}}
					key={index}
					headerLeft={<span>{orderItem._id}</span>}
					headerRight={
						display ? (
							<>
								<span className='btn btn-success'>
									{getStatus(orderItem.orderStatus)}
								</span>
								<button
									className='btn btn-danger'
									onClick={() => setDisplay(false)}>
									Hide
								</button>{" "}
							</>
						) : (
							<>
								<span className='btn btn-success'>
									{getStatus(orderItem.orderStatus)}
								</span>
								<button
									className='btn btn-primary'
									onClick={() => setDisplay(true)}>
									Show
								</button>
							</>
						)
					}>
					{}

					<span style={{ display: display ? null : "none" }}>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								padding: "50px 50px",
								alignItems: "center",
							}}>
							<div>
								<div className='title'>Items</div>
								{orderItem.items.map((item, index) => (
									<div className='value' key={index}>
										<img
											src={generatePublicUrl(
												item.productId.productPictures[0].image
											)}
											width='100px'
											height='100px'
										/>
										<span className='mx-3'>{item.productId.name}</span>
										<span>
											{item.purchasedQty} X {item.payablePrice}
										</span>
										<span className='mx-3 d-flex'>
											{item.color ? (
												<div style={{ color: `${item.color}` }}>
													Color :{item.color}
												</div>
											) : null}
											{item.size ? <div>Size :{item.size}</div> : null}
										</span>
									</div>
								))}
							</div>
							{orderItem.color ? <div>Color :{orderItem.color}</div> : null}
							{orderItem.size ? <div>Size :{orderItem.size}</div> : null}

							<div>
								<span className='title'>Total Price</span>
								<br />
								<span className='value'>{orderItem.totalAmount}</span>
							</div>
							<div>
								<span className='title'>Payment Type</span> <br />
								<span className='value'>{orderItem.paymentType}</span>
							</div>
							<div>
								<span className='title'>Payment Status</span> <br />
								<span className='value'>{orderItem.paymentStatus}</span>
							</div>
							{orderItem.address ? (
								<div>
									<span className='title'>Address / Info</span> <br />
									{/* <span className='value'>{orderItem.address}</span> */}
									<p className='value'>
										<p className='m-0'>Name : {orderItem.user.name}</p>
										<p className='m-0'>Name : {orderItem.user.email}</p>
										Mobile Number :{orderItem.address.mobileNumber} /{" "}
										{orderItem.address.alternatePhone} / {orderItemuser.phone}
									</p>
									<p className='value'>
										<p className='m-0'>Address: {orderItem.address.address}</p>
										<p className='m-0'>Zip code: {orderItem.address.zipCode}</p>
										<p className='m-0'>
											City/District: {orderItem.address.cityDistrict}
										</p>
									</p>
								</div>
							) : null}
						</div>
						<div
							style={{
								boxSizing: "border-box",
								padding: "100px",
								display: "flex",
								alignItems: "center",
							}}>
							<div className='orderTrack'>
								{orderItem.orderStatus.map((status) => (
									<div
										className={`orderStatus ${
											status.isCompleted ? "active" : ""
										}`}>
										<div
											className={`point ${
												status.isCompleted ? "active" : ""
											}`}></div>
										<div className='orderInfo'>
											<div className='status'>{status.type}</div>
											<div className='date'>{formatDate(status.date)}</div>
										</div>
									</div>
								))}
							</div>

							{/* select input to apply order action */}
							<div
								style={{
									padding: "0 50px",
									boxSizing: "border-box",
								}}>
								<select
									onChange={(e) => setType(e.target.value)}
									className='btn btn-success'>
									<option value={""}>select status</option>
									{orderItem.orderStatus.map((status) => {
										return (
											<>
												{!status.isCompleted ? (
													<option key={status.type} value={status.type}>
														{status.type}
													</option>
												) : null}
											</>
										);
									})}
								</select>
							</div>
							{/* button to confirm action */}

							<div
								style={{
									padding: "0 50px",
									boxSizing: "border-box",
								}}>
								<button
									onClick={() => onOrderUpdate(orderItem._id)}
									className='btn btn-primary'>
									confirm
								</button>
							</div>
						</div>
					</span>
				</Card>
			))}
		</>
	);
};

export default Orders;
