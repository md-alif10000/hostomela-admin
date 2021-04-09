// import React,{useState} from 'react'
// import { useSelector, useDispatch } from "react-redux";
// import {Table} from 'react-bootstrap'
// import { deleteProductById } from "../../../actions/product.action";
// import { Redirect } from 'react-router';
// import {Row,Col} from 'react-bootstrap'
// import Modal from '../../components/UI/Modal'
// import { generatePublicUrl } from 'src/urlconfig';

// export default function AllProducts(props) {
//   const [productDetailModal, setProductDetailModal] = useState(true)
//   const [productDetails, setProductDetails] = useState(null)
//    const dispatch = useDispatch()
//     const product = useSelector((state) => state.product);
//     const auth = useSelector((state) => state.auth);

//       if (!auth.authenticate) return <Redirect to={"/login"} />;


//  const handleCloseProductDetailsModal = () => {
//    setProductDetailModal(false);
//  };

//   const showProductDetailsModal = (product) => {
//     setProductDetails(product);
//     setProductDetailModal(true);
//   };

// const renderProductDetailsModal = () => {
//   if (!productDetails) {
//     return null;
//   }

//   return (
//     <Modal
//       show={productDetailModal}
//       handleClose={handleCloseProductDetailsModal}
//       modalTitle={"Product Details"}
//       size="lg"
//     >
//       <Row>
//         <Col md="6">
//           <label className="key">Name</label>
//           <p className="value">
//             <h5>{productDetails.name}</h5>
//           </p>
//         </Col>
//         <Col md="6">
//           <label className="key">Price</label>
//           <p className="value">
//             <strong>{productDetails.price}</strong>
//           </p>
//         </Col>
//       </Row>
//       <Row>
//         <Col md="6">
//           <label className="key">Quantity</label>
//           <p className="value">
//             <strong>{productDetails.quantity}</strong>
//           </p>
//         </Col>
//         <Col md="6">
//           <label className="key">Category</label>
//           <p className="value">
//             <strong>{productDetails.category.name}</strong>
//           </p>
//         </Col>
//       </Row>
//       <Row>
//         <Col md="12">
//           <label className="key">Description</label>
//           <p className="value">{productDetails.description}</p>
//         </Col>
//       </Row>
//       <Row>
//         <Col>
//           <label className="key">Product Pictures</label>
//           <div style={{ display: "flex" }}>
//             {productDetails.productPictures.map((picture) => (
//               <div className="productImgContainer" style={{ margin: "20px" }}>
//                 <img
//                   style={{ height: "200px" }}
//                   src={generatePublicUrl(picture.img)}
//                   alt=""
//                 />
//               </div>
//             ))}
//           </div>
//         </Col>
//       </Row>
//     </Modal>
//   );
// };











//     return (
//       <Table style={{ fontSize: 12 }} responsive="sm">
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Name</th>
//             <th>Price</th>
//             <th>Quantity</th>
//             <th>Category</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {product.products.length > 0
//             ? product.products.map((product) => (
//                 <tr key={product._id}>
//                   <td>2</td>
//                   <td>{product.name}</td>
//                   <td>{product.price}</td>
//                   <td>{product.quantity}</td>
//                   <td>{product.category ? product.category.name : null}</td>
//                   {/* {console.log(product.category.name)} */}
//                   <td>
//                     <button onClick={() => showProductDetailsModal(product)}>
//                       info
//                     </button>
//                     {renderProductDetailsModal()}
//                     <button
//                       onClick={() => {
//                         const payload = {
//                           productId: product._id,
//                         };
//                         console.log(product._id)
//                         dispatch(deleteProductById(payload));
//                         <Redirect to={'/all-products'}/> 
//                       }}
//                     >
//                       delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             : null}
//         </tbody>
//       </Table>
//     );
// }
