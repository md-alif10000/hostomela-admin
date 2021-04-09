import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MODAL from "../components/UI/Modal";
import {
	addCoupon,
	getAllCoupon,
	deleteCoupon,
} from "../../actions/coupon.action";
import { CInput } from "@coreui/react";

export default function Coupons(props) {
	const [addCouponModal, setAddCouponModal] = useState(false);
	const [name, setName] = useState("");
	const [type, setType] = useState("");
	const [amount, setAmount] = useState("");
	const [validFrom, setValidFrom] = useState("");
	const [validTo, setValidTo] = useState("");

	const coupons = useSelector((state) => state.coupons);

	const dispatch = useDispatch();

	const addCouponHandler = () => {
		console.log({ name, type, amount, validFrom, validTo });
		dispatch(addCoupon({ name, type, amount, validFrom, validTo }));
		setAddCouponModal(false);
		dispatch(getAllCoupon());
	};

	const deleteCouponById = (_id) => {
		console.log("coupon Id", _id);
		dispatch(deleteCoupon({ _id }));
		dispatch(getAllCoupon());
	};

	useEffect(() => {
		dispatch(getAllCoupon());
	}, []);

	const renderAddCouponModal = () => {
		return (
			<MODAL
				modalTitle='Add New Coupon'
				show={addCouponModal}
				handleClose={() => setAddCouponModal(false)}>
				<CInput
					className='m-2'
					type={"text"}
					label={"Category Name"}
					value={name}
					placeholder={"Enter Coupon Name"}
					onChange={(e) => setName(e.target.value)}
				/>

				<CInput
					className='m-2'
					type={"number"}
					label={"Amount."}
					value={amount}
					placeholder={"Enter Coupon amount"}
					onChange={(e) => setAmount(e.target.value)}
				/>

				<CInput
					className='m-2'
					type={"number"}
					label={"Price"}
					value={amount}
					placeholder={"Enter Coupon amount"}
					onChange={(e) => setAmount(e.target.value)}
				/>

				<button
					type='button'
					className='btn btn-primary mr-5 m-2'
					onClick={addCouponHandler}>
					Add Gift-Card
				</button>
			</MODAL>
		);
	};

	return (
		<>
			{renderAddCouponModal()}
			<div className='card'>
				<div
					class='card-header d-flex '
					style={{ justifyContent: "space-between" }}>
					<h5>Your Coupons</h5>
					<button
						type='button'
						className='btn btn-primary mr-5'
						onClick={() => setAddCouponModal(true)}>
						Add Gift-Card
					</button>
				</div>
				<div class='card-body row' style={{ display: "flex" }}>
					{coupons.coupons.length == 0
						? null
						: coupons.coupons.map((coupon, index) => (
								<div className='bg-success col-lg-3 col-sm-12 m-2 p-2 col-md-2'>
									<h2>Name- {coupon.name}</h2>
									<p>Type-{coupon.type}</p>
									<h4>Amount -{coupon.amount}</h4>
									<p>
										<span className='mx-2'>
											Valid From - {coupon.validFrom}
										</span>
										<br />
										<span className='mx-2'>Valid TO -{coupon.validTo}</span>
									</p>
									<button className='btn btn-primary mx-2'>Edit</button>

									<span
										// type='button'
										onClick={(e) => deleteCouponById(coupon._id)}
										className='btn btn-danger mx-2'>
										Delete
									</span>
								</div>
						  ))}
				</div>
			</div>
		</>
	);
}
