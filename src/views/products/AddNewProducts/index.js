import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { addProduct, deleteProductById } from "../../../actions";
import Swal from "sweetalert2";
import {
	FormControl,
	InputLabel,
	Select,
	Input,
	TextField,
	Button,
	MenuItem,
} from "@material-ui/core";

import { Redirect } from "react-router";




//  export function productPicture(files) {
//    setProductPictures(files);
//  }

export default function AddNewProducts(props) {
	const [productPictures, setProductPictures] = useState([]);
	const [image, setImage] = useState(null)
	const [picture1, setPicture1] = useState(null)
	const [name, setName] = useState("");
	const [quantity, setQuantity] = useState("");
	const [price, setPrice] = useState("");
	const [description, setDescription] = useState("");
	const [categoryId, setCategoryId] = useState("");
	const [productDetails, setProductDetails] = useState(null);
	const [highlight1, setHighlight1] = useState();
	const [highlight2, setHighlight2] = useState();
	const [highlight3, setHighlight3] = useState();
	const [highlight4, setHighlight4] = useState();
	const [highlight5, setHighlight5] = useState();
	const [productType, setProductType] = useState("");
	const [size, setSize] = useState("");
	const [sizePrice, setSizePrice] = useState();
	const [sizes, setSizes] = useState([]);
	const [colorName, setColorName] = useState('')
	const [colorCode, setColorCode] = useState('');

	const [colors, setColors] = useState([]);

	const highlights = [
		highlight1,
		highlight2,
		highlight3,
		highlight4,
		highlight5,
	];
	const category = useSelector((state) => state.category);
	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const useStyles = makeStyles((theme) => ({
		button: {
			display: "block",
			marginTop: theme.spacing(2),
		},
		formControl: {
			margin: theme.spacing(1),
			minWidth: 420,
		},
	}));

	const classes = useStyles();



		const handleProductPictures = (e) => {
			setProductPictures([...productPictures, e.target.files[0]]);
		};

	// const productPictures = [];

	// const updateFilesCb = (file) => {
	//   console.log("File uploded");
	//   productPictures.push(file);
	//   console.log(productPictures);
	// };



	const submitProductForm = () => {
		console.log(productPictures)

		const form = new FormData();

		form.append("name", name);
		form.append("quantity", quantity);
		form.append("price", price);
		form.append("description", description);
		form.append("category", categoryId);
		form.append("colors", JSON.stringify(colors));
		form.append("sizes", JSON.stringify(sizes));
		for (let highlight of highlights) {
			form.append("highlights", highlight);
		}


		for (let pic of productPictures) {
			console.log(pic)
			form.append("productPicture", pic);
		}

		

	

		if (name == "")
			return Swal.fire(
				"Oops...",
				"<h3>Product Neme is required..!</h3>",
				"error"
			);

		if (price == "")
			return Swal.fire("Oops...", "<h3>Price is required..!</h3>", "error");
		if (quantity == "")
			return Swal.fire("Oops...", "Quantity is required..!", "error");
		if (productPictures.length  == 0)
					return Swal.fire("Oops...", "Add product Image.!", "error");

		dispatch(addProduct(form));
		setName("");
		setQuantity("");
		setPrice("");
		setDescription("");
		setCategoryId("");
		setProductPictures([]);
	};


	const sizeHandler = (e) => {
		e.preventDefault();
		setSizes([...sizes, { size, price: parseInt(sizePrice) }]);
		setSize("");
		setSizePrice("");

	};
	const colorHandler = (e) => {
		e.preventDefault();
		setColors([...colors, { colorName, code: colorCode }]);
		setColorName("");
		setColorCode("");


	};



	const createCategoryList = (categories, options = []) => {
		for (let category of categories) {
			options.push({ value: category._id, name: category.name });
			if (category.children.length > 0) {
				createCategoryList(category.children, options);
			}
		}

		return options;
	};





	

	if (!auth.authenticate) return <Redirect to={"/login"} />;

	return (
		<div className='text-center m-auto '>
			<div
				className='col-md-6 col=lg-8 col-sm-10 p-5 '
				style={{ border: "5px solid black" }}>
				<form onSubmit={submitProductForm}>
					<TextField
						id='standard-full-width'
						label='Label'
						style={{ margin: 8 }}
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder='Placeholder'
						helperText='Full width!'
						fullWidth
						margin='normal'
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<div className='row'>
						<div className='col'>
							<TextField
								id='filled-name'
								label='Price'
								value={price}
								onChange={(e) => setPrice(e.target.value)}
								variant='filled'
							/>
						</div>
						<div className='col'>
							<TextField
								id='filled-name'
								label='Stock'
								value={quantity}
								onChange={(e) => setQuantity(e.target.value)}
								variant='filled'
							/>
						</div>
					</div>

					<div>
						<TextField
							id='standard-full-width'
							label='Product Description'
							value={highlight1}
							onChange={(e) => setHighlight1(e.target.value)}
							fullWidth
						/>
						<TextField
							id='standard-full-width'
							label='2'
							value={highlight2}
							onChange={(e) => setHighlight2(e.target.value)}
							fullWidth
						/>
						<TextField
							id='standard-full-width'
							label='3'
							value={highlight3}
							onChange={(e) => setHighlight3(e.target.value)}
							fullWidth
						/>
						<TextField
							id='standard-full-width'
							label='4'
							value={highlight4}
							onChange={(e) => setHighlight4(e.target.value)}
							fullWidth
						/>
						<TextField
							id='standard-full-width'
							label='5'
							value={highlight5}
							onChange={(e) => setHighlight5(e.target.value)}
							fullWidth
						/>
					</div>
					<div>
						<h4>Select Product Type</h4>
						<select
							value={productType}
							onChange={(e) => {
								setColors([]);
								setSizes([]);
								setProductType(e.target.value);
							}}
							className='input p-2 m-3'>
							<option selected value=''>
								Select Product Type
							</option>
							<option value='sharee'>Sharee</option>
							<option value='other'>Other</option>
							<option value='non-variation'>Non variation</option>
						</select>
					</div>

					{productType == "other" ? (
						<div>
							<h3>Add Sizes</h3>
							<div>
								{sizes.map((item, index) => (
									<p key={index}>
										Size :{item.size} Price: {item.price}
									</p>
								))}
							</div>

							<div>
								<input
									type='text'
									className='input m-2'
									placeholder='size'
									width='100px'
									value={size}
									style={{ width: "100px" }}
									onChange={(e) => setSize(e.target.value)}
								/>
								<input
									type='number'
									style={{ width: "100px" }}
									placeholder='price'
									value={sizePrice}
									onChange={(e) => setSizePrice(e.target.value)}
								/>
								<button
									className='btn btn-primary btn-sm m-2'
									onClick={sizeHandler}>
									Add size
								</button>
							</div>
						</div>
					) : null}

					{productType == "sharee" ? (
						<div>
							<h3>Colors</h3>
							<div>
								{colors.map((color, index) => (
									<div key={index}>
										{console.log(color)}
										<p>
											Color-{index + 1}- {color.colorName}{" "}
											<input type='color' value={color.code} />{" "}
										</p>
									</div>
								))}
							</div>

							<div className='m-1'>
								<input
									type='text'
									placeholder='color name'
									value={colorName}
									onChange={(e) => setColorName(e.target.value)}
								/>
								<input
									type='color'
									value={colorCode}
									onChange={(e) => {
										console.log(e.target.value);
										setColorCode(e.target.value);
									}}
								/>
								<button
									className='btn btn-sm btn-primary m-2'
									onClick={colorHandler}>
									Add color
								</button>
							</div>
						</div>
					) : null}

					<div className='text-center mb-4'>
						<FormControl className={classes.formControl}>
							<InputLabel fullWidth id='demo-controlled-open-select-label'>
								Select a category
							</InputLabel>
							<h3>Select Category</h3>
							<Select
								labelId='demo-controlled-open-select-label'
								id='demo-controlled-open-select'
								// open={open}
								// onClose={handleClose}
								// onOpen={handleOpen}
								className='form-control'
								value={categoryId}
								placeholder='Select Category'
								onChange={(e) => setCategoryId(e.target.value)}>
								<MenuItem value=''>
									<em>None</em>
								</MenuItem>
								{createCategoryList(category.categories).map((option) => (
									<MenuItem key={option.value} value={option.value}>
										{option.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</div>
					{productPictures.length > 0
						? productPictures.map((pic, index) => (
								<div key={index}>{pic.name}</div>
						  ))
						: null}

					<div style={{ margin: "50px", textAlign: "center" }}>
						<input
							type='file'
							value={image}
							name='productPicture'
							onChange={handleProductPictures}
							className='productImageUpload'
						/>

						<button className='btn btn-sm btn-danger fileClear' onClick={(e)=>{e.preventDefault(); setImage(''); setProductPictures([])}} >Remove</button>
					</div>

					<div className='text-center mb-5'>
						<div>
							<Button
								variant='contained'
								color='primary'
								onClick={submitProductForm}>
								Add new product
							</Button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
