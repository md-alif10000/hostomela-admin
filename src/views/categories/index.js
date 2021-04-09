import React, { useState,useEffect } from "react";
import "./style.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
	addCategory,
	getAllCategory,
	updateCategories,
	deleteCategories as deleteCategoriesAction,
} from "../../actions/category.action";

import MODAL from "../components/UI/Modal/index";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import {
	IoCheckboxOutline,
	IoCheckbox,
	IoChevronForwardCircleOutline,
	IoChevronDownCircleSharp,
	IoAddCircleOutline,
	IoTrashOutline,
} from "react-icons/io5";
import UpdateCategoriesModal from "./components/UpdateCategoriesModal";
import AddCategoryModal from "./components/AddCategoryModal";

function Category(props) {
	const dispatch = useDispatch();

	const category = useSelector((state) => state.category);
	const [categoryName, setCategoryName] = useState("");
	const [parentCategoryId, setParentCategoryId] = useState("");
	const [categoryImage, setCategoryImage] = useState(null);
	const [checked, setChecked] = useState([]);
	const [expanded, setExpanded] = useState([]);
	const [checkedArray, setCheckedArray] = useState([]);
	const [expandedArray, setExpandedArray] = useState([]);
	const [show, setShow] = useState(false);
	const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
	const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);


	useEffect(() => {
		if(!category.loading){

		}
		
		
	}, [category.loading])





	const renderCategories = (categories) => {
		let myCategories = [];

		for (let category of categories) {
			myCategories.push({
				label: category.name,
				value: category._id,
				children:
					category.children.length > 0 && renderCategories(category.children),
			});
		}
		return myCategories;
	};

	const handleClose = () => {
		setShow(false);
	};

	const AddAndClose = () => {
		const form = new FormData();
		
		if (categoryName == "") {
			alert("Name is Required");
			return;
		}

		form.append("name", categoryName);
		form.append("parentId", parentCategoryId);
		form.append("categoryImage", categoryImage);
        console.log(form)
		dispatch(addCategory(form));
		setCategoryName("");
		setParentCategoryId("");

		const cat = {
			categoryName,
			parentCategoryId,
			categoryImage,
		};
		console.log(cat);
		setShow(false);
	};

	const handleShow = () => setShow(true);

	const createCategoryList = (categories, options = []) => {
		for (let category of categories) {
			options.push({
				value: category._id,
				name: category.name,
				parentId: category.parentId,
				type: category.type,
			});
			if (category.children) {
				createCategoryList(category.children, options);
			}
		}
		return options;
	};

	const handleCategoryImage = (e) => {
		setCategoryImage(e.target.files[0]);
	};

	const updateCategory = () => {
		updateCheckedAndExpandedCategories();
		setUpdateCategoryModal(true);
	};

	const updateCheckedAndExpandedCategories = () => {
		const categories = createCategoryList(category.categories);
		const checkedArray = [];
		const expandedArray = [];
		checked.length > 0 &&
			checked.forEach((categoryId, index) => {
				const category = categories.find(
					(category, _index) => categoryId == category.value
				);
				category && checkedArray.push(category);
			});

		expanded.length > 0 &&
			expanded.forEach((categoryId, index) => {
				const category = categories.find(
					(category, _index) => categoryId == category.value
				);
				category && expandedArray.push(category);
			});
		setCheckedArray(checkedArray);
		setExpandedArray(expandedArray);
	};

	const handleCategoryInput = (key, value, index, type) => {
		if (type == "checked") {
			const updatedCheckedArray = checkedArray.map((item, _index) =>
				index == _index ? { ...item, [key]: value } : item
			);
			setCheckedArray(updatedCheckedArray);
		} else if (type == "expanded") {
			const updatedExpandedArray = expandedArray.map((item, _index) =>
				index == _index ? { ...item, [key]: value } : item
			);
			setExpandedArray(updatedExpandedArray);
		}
	};

	const UpdatedCategoriesForm = () => {
		const form = new FormData();
		expandedArray.forEach((item, index) => {
			form.append("_id", item.value);
			form.append("name", item.name);
			form.append("parentId", item.parentId ? item.parentId : "");
			form.append("type", item.type);
		});

		checkedArray.forEach((item, index) => {
			form.append("_id", item.value);
			form.append("name", item.name);
			form.append("parentId", item.parentId ? item.parentId : "");
			form.append("type", item.type);
		});

		dispatch(updateCategories(form)).then((result) => {
			if (result) {
				dispatch(getAllCategory());
			}
		});

		setUpdateCategoryModal(false);
	};

	const deleteCategory = () => {
		updateCheckedAndExpandedCategories();
		setDeleteCategoryModal(true);
	};

	const deleteCategories = () => {
		const checkedIdsArray = checkedArray.map((item, index) => ({
			_id: item.value,
		}));
		const expandedIdsArray = expandedArray.map((item, index) => ({
			_id: item.value,
		}));
		const idsArray = expandedIdsArray.concat(checkedIdsArray);
		if (checkedArray.length > 0) {
			dispatch(deleteCategoriesAction(checkedIdsArray)).then((result) => {
				if (result) {
					dispatch(getAllCategory());
					setDeleteCategoryModal(false);
				}
			});
		}
		dispatch(getAllCategory());
		setDeleteCategoryModal(false);
	};

	const renderDeleteCategoryModal = () => {
		return (
			<MODAL
				modalTitle='Confirm'
				show={deleteCategoryModal}
				handleClose={() => setDeleteCategoryModal(false)}
				buttons={[
					{
						label: "No",
						color: "primary",
						onClick: () => {
							alert("No");
						},
					},
					{
						label: "Yes",
						color: "danger",
						onClick: deleteCategories,
					},
				]}>
				Are you sure?
				<h5>Expanded</h5>
				{expandedArray.map((item, index) => (
					<span key={index}>{item.name}</span>
				))}
				<h5>Checked</h5>
				{checkedArray.map((item, index) => (
					<span key={index}>{item.name}</span>
				))}
			</MODAL>
		);
	};

	return (
		 <>
			<Container>
				<Row>
					<Col md={12}>
						<div style={{ display: "flex", justifyContent: "space-between" }}>
							<h3>Category</h3>
							<div className='actionBtnContainer'>
								<button onClick={handleShow}>
									<IoAddCircleOutline />
									Add
								</button>
								<button onClick={deleteCategory}>
									<IoTrashOutline />
									Delete
								</button>
								<button onClick={updateCategory}>Edit</button>
							</div>
						</div>
					</Col>
				</Row>

				<Row>
					<Col md={12}>
						<CheckboxTree
							nodes={renderCategories(category.categories)}
							checked={checked}
							expanded={expanded}
							onCheck={(checked) => setChecked(checked)}
							onExpand={(expanded) => setExpanded(expanded)}
							icons={{
								check: <IoCheckbox />,
								uncheck: <IoCheckboxOutline />,
								halfCheck: <IoCheckboxOutline />,
								expandClose: <IoChevronForwardCircleOutline />,
								expandOpen: <IoChevronDownCircleSharp />,
							}}
						/>
					</Col>
				</Row>
			</Container>

			<AddCategoryModal
				modalTitle={"Add New Category"}
				show={show}
				handleClose={handleClose}
				AddAndClose={AddAndClose}
				categoryName={categoryName}
				setCategoryName={setCategoryName}
				categoryList={createCategoryList(category.categories)}
				handleCategoryImage={handleCategoryImage}
				parentCategoryId={parentCategoryId}
				setParentCategoryId={setParentCategoryId}
			/>

			<UpdateCategoriesModal
				show={updateCategoryModal}
				handleClose={() => setUpdateCategoryModal(false)}
				modalTitle={"Update Categories"}
				size={"lg"}
				expandedArray={expandedArray}
				checkedArray={checkedArray}
				handleCategoryInput={handleCategoryInput}
				categoryList={createCategoryList(category.categories)}
				UpdatedCategoriesForm={UpdatedCategoriesForm}
			/>

			{renderDeleteCategoryModal()}
		</>
	);
}

export default Category;
