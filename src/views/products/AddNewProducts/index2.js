import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { addProduct, deleteProductById } from "../../../actions";
import Swal from "sweetalert2";
import {
  FormControl,
  InputLabel,
  Select,
  Input,
  FormHelperText,
  TextField,
  Button,
  MenuItem,
} from "@material-ui/core";
import FileUpload from "./FilesUpload";
import { Redirect } from "react-router";

//  export function productPicture(files) {
//    setProductPictures(files);
//  }

export default function AddNewProducts(props) {
  const [productPictures, setProductPictures] = useState([])
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productDetails, setProductDetails] = useState(null);
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

  // const productPictures = [];

  // const updateFilesCb = (file) => {
  //   console.log("File uploded");
  //   productPictures.push(file);
  //   console.log(productPictures);
  // };

  const submitProductForm = () => {
    const form = new FormData();

    form.append("name", name);
    form.append("quantity", quantity);
    form.append("price", price);
    form.append("description", description);
    form.append("category", categoryId);

    for (let pic of productPictures) {
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
    if (description == "")
      return Swal.fire(
        "Oops...",
        "Product description is required..!",
        "error"
      );

    dispatch(addProduct(form));
    setName("");
    setQuantity("");
    setPrice("");
    setDescription("");
    setCategoryId("");
    setProductPictures([])
  };



  const handleProductPictures = (e) => {
    setProductPictures([...productPictures, e.target.files[0]]);
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
    <div className="text-center m-auto ">
      <div
        className="col-md-6 col=lg-8 col-sm-10 p-5 "
        style={{ border: "5px solid black" }}
      >
        <form onSubmit={submitProductForm}>
          <TextField
            id="standard-full-width"
            label="Label"
            style={{ margin: 8 }}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Placeholder"
            helperText="Full width!"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <div className="row">
            <div className="col">
              <TextField
                id="filled-name"
                label="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                variant="filled"
              />
            </div>
            <div className="col">
              <TextField
                id="filled-name"
                label="Stock"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                variant="filled"
              />
            </div>
          </div>
          <div className="row mt-5 mb-5">
            <div className="col">
              <TextField
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={8}
                variant="outlined"
                fullWidth
              />
            </div>
          </div>
          <div className="text-center mb-4">
            <FormControl className={classes.formControl}>
              <InputLabel fullWidth id="demo-controlled-open-select-label">
                Select a category
              </InputLabel>
              <h3>Select Category</h3>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                // open={open}
                // onClose={handleClose}
                // onOpen={handleOpen}
                className="form-control"
                value={categoryId}
                placeholder="Select Category"
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <MenuItem value="">
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
          {/* <FileUpload updateFilesCb={updateFilesCb}></FileUpload> */}
          <div style={{margin:'50px',textAlign:'center'}}>
  
            <input type="file" name="productPicture"
         onChange={handleProductPictures} multiple/>
       
          </div>

          <div className="text-center mb-5">
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={submitProductForm}
              >
                Add new product
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
