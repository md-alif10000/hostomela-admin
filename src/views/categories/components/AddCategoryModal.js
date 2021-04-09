import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import MODAL from "../../components/UI/Modal";

import {

  CInput,

} from "@coreui/react";

const AddCategoryModal = (props) => {
	const {
		show,
		handleClose,
		modalTitle,
		AddAndClose,
		categoryName,
		setCategoryName,
		parentCategoryId,
		setParentCategoryId,
		categoryList,
		handleCategoryImage,
	} = props;
	return (
		<MODAL show={show} handleClose={handleClose} modalTitle={modalTitle}>
			<CInput
				type={"text"}
				label={"Category Name"}
				value={categoryName}
				placeholder={"Enter category name"}
				onChange={(e) => setCategoryName(e.target.value)}
			/>

			<select
				value={parentCategoryId}
				className='form-control'
				onChange={(e) => setParentCategoryId(e.target.value)}>
				<option>Select Category</option>
				{categoryList.map((option) => (
					<option value={option.value}>{option.name}</option>
				))}
			</select>
			<Row>
				<Col>
					<input
						style={{ marginTop: "20px" }}
						type='file'
						onChange={handleCategoryImage}></input>
				</Col>
			</Row>
			<Row style={{marginTop:'30px'}}>
				<Col >
					<Button variant='secondary' onClick={handleClose}>
						Close
					</Button>
					<Button variant='primary' style={{marginLeft:'100px'}} onClick={AddAndClose}>
						Save Changes
					</Button>
				</Col>
			</Row>
		</MODAL>
	);
};

export default AddCategoryModal;
