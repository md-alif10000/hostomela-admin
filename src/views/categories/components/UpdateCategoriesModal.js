import React, { use } from "react";
import { Button, Row, Col } from "react-bootstrap";
import MODAL from "../../components/UI/Modal";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";

const UpdateCategoriesModal = (props) => {
	const {
		handleClose,
		modalTitle,
		size,
		show,
		expandedArray,
		checkedArray,
		handleCategoryInput,
		categoryList,
		UpdatedCategoriesForm,
	} = props;

	console.log({ expandedArray, checkedArray });

	return (
		<MODAL
			show={show}
			handleClose={handleClose}
			modalTitle={modalTitle}
			size={size}>
			<Row>
				<Col>
					<h6>Expanded</h6>
				</Col>
			</Row>

			{expandedArray.length > 0 &&
				expandedArray.map((item, index) => (
					<Row key={index}>
						<Col>
							<CInput
								type={"text"}
								value={item.name}
								placeholder={"Enter category name"}
								onChange={(e) =>
									handleCategoryInput("name", e.target.value, index, "expanded")
								}
							/>
						</Col>
						<Col>
							<select
								value={item.parentId}
								className='form-control'
								onChange={(e) =>
									handleCategoryInput(
										"parentId",
										e.target.value,
										index,
										"expanded"
									)
								}>
								<option>Select Category</option>
								{categoryList.map((option) => (
									<option value={option.value}>{option.name}</option>
								))}
							</select>
						</Col>
						<Col>
							<select
								className='form-control'
								value={item.type}
								onChange={(e) =>
									handleCategoryInput("type", e.target.value, index, "expanded")
								}>
								<option value=''>Select Type</option>
								<option value='store'>Store</option>
								<option value='product'>Product</option>
								<option value='page'>Page</option>
							</select>
						</Col>
					</Row>
				))}

			<h6>Checked Category</h6>
			{checkedArray.length > 0 &&
				checkedArray.map((item, index) => (
					<Row key={index}>
						<Col>
							<CInput
								type={"text"}
								value={item.name}
								placeholder={"Enter category name"}
								onChange={(e) =>
									handleCategoryInput("name", e.target.value, index, "checked")
								}
							/>
						</Col>
						<Col>
							<select
								value={item.parentId}
								className='form-control'
								onChange={(e) =>
									handleCategoryInput(
										"parentId",
										e.target.value,
										index,
										"checked"
									)
								}>
								<option>Select Category</option>
								{categoryList.map((option) => (
									<option value={option.value}>{option.name}</option>
								))}
							</select>
						</Col>
						<Col>
							<select
								className='form-control'
								value={item.type}
								onChange={(e) =>
									handleCategoryInput("type", e.target.value, index, "checked")
								}>
								<option value=''>Select Type</option>
								<option value='store'>Store</option>
								<option value='product'>Product</option>
								<option value='page'>Page</option>
							</select>
						</Col>
					</Row>
				))}

			<Button variant='secondary' onClick={handleClose}>
				Close
			</Button>
			<Button variant='primary' onClick={UpdatedCategoriesForm}>
				Save Changes
			</Button>
		</MODAL>
	);
};

export default UpdateCategoriesModal;
