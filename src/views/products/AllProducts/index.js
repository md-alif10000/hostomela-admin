import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";

import { deleteProductById } from "../../../actions/product.action";
import { Redirect } from "react-router";
import { Row, Col } from "react-bootstrap";
import Modal from "../../components/UI/Modal";
import { generatePublicUrl } from "src/urlconfig";
import VisibilityIcon from "@material-ui/icons/Visibility";
import CreateRoundedIcon from "@material-ui/icons/CreateRounded";
import ProductForm from '../ProductForm'

const AllProducts = (props) => {
  const [productDetailModal, setProductDetailModal] = useState(true);
  const [productDetails, setProductDetails] = useState(null);
  const [productUpdateModal, setProductUpdateModal] = useState(false);
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const { products } = product;

  const items = [];
  products.map((item, index) => {
    items.push(item);
  });

  const columns = [
    { title: "Products Name", field: "name" },
    { title: "Price", field: "price" },
    {
      title: "Stock",
      field: "quantity",
      render: (row) =>
        row.quantity < 10 ? (
          <h5 style={{ color: "red" }}>{row.quantity}</h5>
        ) : (
          <h5 style={{ color: "yellow" }}>{row.quantity}</h5>
        ),
    },
    {
      title: "Category",
      field: "category",
      render: (row) => row.category && row.category.name,
    },

    {
      title: "Update",
      field: "category",
      render: (row) => (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <VisibilityIcon
            style={{ margin: "0 5px", cursor: "pointer" }}
            variant="contained"
            color="yellow"
            onClick={() => showProductDetailsModal(row)}
          />
          <CreateRoundedIcon
            style={{ margin: "0 5px", cursor: "pointer" }}
            variant="contained"
            color="green"
            onClick={() => showProductUpdateModal(row)}
          />
          <DeleteIcon
            style={{ margin: "0 10px", cursor: "pointer" }}
            variant="contained"
            color="secondary"
            onClick={() => {
              const payload = {
                productId: row._id,
              };
              console.log(row);
              dispatch(deleteProductById(payload));
            }}
          />
        </div>
      ),
    },
  ];



const handleCloseProductDetailsModal = () => {
  setProductDetailModal(false);
};

const showProductDetailsModal = (product) => {
  setProductDetails(product);
  setProductDetailModal(true);
};

const renderProductDetailsModal = () => {
  if (!productDetails) {
    return null;
  }

  return (
    <Modal
      show={productDetailModal}
      handleClose={handleCloseProductDetailsModal}
      modalTitle={"Product Details"}
      size="lg"
    >
      <Row>
        <Col md="6">
          <label className="key">Name</label>
          <p className="value">
            <h5>{productDetails.name}</h5>
          </p>
        </Col>
        <Col md="6">
          <label className="key">Price</label>
          <p className="value">
            <strong>{productDetails.price}</strong>
          </p>
        </Col>
      </Row>
      <Row>
        <Col md="6">
          <label className="key">Quantity</label>
          <p className="value">
            <strong>{productDetails.quantity}</strong>
          </p>
        </Col>
        <Col md="6">
          <label className="key">Category</label>
          <p className="value">
            <strong>{productDetails.category.name}</strong>
          </p>
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <label className="key">Description</label>
          <p className="value">{productDetails.description}</p>
        </Col>
      </Row>
      <Row>
        <Col>
         
        </Col>
      </Row>
    </Modal>
  );
};



  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productPictures, setProductPictures] = useState([]);


const handleCloseProductUpdateModal = () => {
  setProductUpdateModal(false);
};

const showProductUpdateModal = (product) => {
  setName(product.name);
  setQuantity(product.quantity);
  setPrice(product.price);
  setDescription(product.desc);
  setCategoryId(product.category._id);
  setProductPictures(product.productPictures);

  setProductUpdateModal(true);
};





const submitProductForm=()=>{
  console.log('product form submitted')
}

const renderProductUpdateModal = () => {
  // if (!productDetails) {
  //   return null;
  // }
  console.log(description)

  return (
    <Modal
      show={productUpdateModal}
      handleClose={handleCloseProductUpdateModal}
      modalTitle={"Product Details"}
      size="lg"
    >
      <ProductForm
        name={name}
        price={price}
        description={description}
        quantity={quantity}
        categoryId={categoryId}
        productPictures={productPictures}
        onChangeName={(e) => setName(e.target.value)}
        onChangeDescription={(e) => setDescription(e.target.value)}
        onChangePrice={(e) => setPrice(e.target.value)}
        onChangeQuantity={(e) => setQuantity(e.target.value)}
        onChangeCategory={(e) => setCategoryId(e.target.value)}
        onSubmit={submitProductForm}
        actionTitle={"Update Product"}
      />
    </Modal>
  );
};









  return (
    <>
      {renderProductDetailsModal()}
      {renderProductUpdateModal()}
      <MaterialTable
        title="All Products"
        data={items}
        columns={columns}
        options={{
          search: true,
          filtering: true,
          exportButton: true,

          selection: true,
          grouping: true,
          rowStyle: {
            backgroundColor: "#2b70e0",
            color: "white",
          },
        }}
      />
    </>
  );
};
export default AllProducts;
