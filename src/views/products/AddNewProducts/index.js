// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { addProduct, deleteProductById } from "../../../actions";
// import { CButton, CForm, CInput } from "@coreui/react";

// export default function AddNewProducts(props) {
//   const [name, setName] = useState("");
//   const [quantity, setQuantity] = useState("");
//   const [price, setPrice] = useState("");
//   const [description, setDescription] = useState("");
//   const [categoryId, setCategoryId] = useState("");
//   const [productPictures, setProductPictures] = useState([]);
//   const [show, setShow] = useState(false);
//   const category = useSelector((state) => state.category);
//   const dispatch = useDispatch();

//   const handleClose = () => {
//     setShow(false);
//   };

//   const submitProductForm = () => {
//     const form = new FormData();
//     form.append("name", name);
//     form.append("quantity", quantity);
//     form.append("price", price);
//     form.append("description", description);
//     form.append("category", categoryId);

//     for (let pic of productPictures) {
//       form.append("productPicture", pic);
//     }

//     console.log(form)
     
//     dispatch(addProduct(form));
//   };

//   const createCategoryList = (categories, options = []) => {
//     for (let category of categories) {
//       options.push({ value: category._id, name: category.name });
//       if (category.children.length > 0) {
//         createCategoryList(category.children, options);
//       }
//     }

//     return options;
//   };

//   const handleProductPictures = (e) => {
//     setProductPictures([...productPictures, e.target.files[0]]);
//   };

//   return (
//     <>
//       <CForm
//         show={show}
//         handleClose={handleClose}
//         modalTitle={"Add New Product"}
//         onSubmit={submitProductForm}
//       >
//         <CInput
//           label="Name"
//           value={name}
//           placeholder={`Product Name`}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <CInput
//           label="Quantity"
//           value={quantity}
//           placeholder={`Quantity`}
//           onChange={(e) => setQuantity(e.target.value)}
//         />
//         <CInput
//           label="Price"
//           value={price}
//           placeholder={`Price`}
//           onChange={(e) => setPrice(e.target.value)}
//         />
//         <CInput
//           label="Description"
//           value={description}
//           placeholder={`Description`}
//           onChange={(e) => setDescription(e.target.value)}
//         />
//         <select
//           className="form-control"
//           value={categoryId}
//           onChange={(e) => setCategoryId(e.target.value)}
//         >
//           <option>select category</option>
//           {createCategoryList(category.categories).map((option) => (
//             <option key={option.value} value={option.value}>
//               {option.name}
//             </option>
//           ))}
//         </select>
//         {productPictures.length > 0
//           ? productPictures.map((pic, index) => (
//               <div key={index}>{pic.name}</div>
//             ))
//           : null}
//         <input
//           type="file"
//           name="productPicture"
//           onChange={handleProductPictures}
//         />
//         <CButton block color="primary" onClick={submitProductForm}>
//           Add New Product
//         </CButton>
//       </CForm>
//     </>
//   );
// }
