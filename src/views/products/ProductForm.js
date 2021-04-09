import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";

import {
  FormControl,
  InputLabel,
  Select,
  TextField,
  Button,
  MenuItem,
} from "@material-ui/core";
import FileUpload from "./AddNewProducts/FilesUpload";
import { generatePublicUrl } from "src/urlconfig";

//  export function productPicture(files) {
//    setProductPictures(files);
//  }
export default function ProductForm(props) {
    const {name,price,description,quantity,categoryId,onChangeName,

     productPictures,
      onChangeDescription,
      onChangePrice,
      onChangeQuantity,
      onChangeCategory,
      onSubmit,
      actionTitle,
    } = props;

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


    const createCategoryList = (categories, options = []) => {
      for (let category of categories) {
        options.push({ value: category._id, name: category.name });
        if (category.children.length > 0) {
          createCategoryList(category.children, options);
        }
      }
      return options;
    };

    const updateFilesCb = (file) => {
      console.log("File uploded");
      productPictures.push(file);
      console.log(productPictures);
    };


    return (
      <div
        className="p-5 "
        style={{ border: "5px solid black", width: "100%" }}
      >
        <form style={{ width: "100%" }}>
          <div style={{ display: "flex" }}>
            <TextField
              id="standard-full-width"
              label="Label"
              style={{ margin: 8 }}
              value={name}
              onChange={onChangeName}
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
                  onChange={onChangePrice}
                  variant="filled"
                />
              </div>
              <div className="col">
                <TextField
                  id="filled-name"
                  label="Stock"
                  value={quantity}
                  onChange={onChangeQuantity}
                  variant="filled"
                />
              </div>
            </div>
          </div>
          <div>
            <div className="row mt-5 mb-5">
              <div className="col">
                <TextField
                  value={description}
                  onChange={onChangeDescription}
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
              <FormControl>
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
                  onChange={onChangeCategory}
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
            <div style={{ width: "300px" }}>
              <label className="key">Product Pictures</label>
              <div style={{ display: "flex" }}>
                {productPictures.map((picture,index) => (
                  <div
                    className="productImgContainer"
                    style={{ margin: "20px" }}
                  >
                    <img
                      style={{ height: "200px" }}
                      src={generatePublicUrl(picture.img)}
                      alt=""
                    />
                    <Button>
                      <DeleteIcon
                        style={{ margin: "0 10px", cursor: "pointer" }}
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                        productPictures.pop(index);
                        console.log(productPictures);
                        
                        }}
                      />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <FileUpload updateFilesCb={updateFilesCb}></FileUpload>
            <div className="text-center mb-5">
              <div>
                <Button variant="contained" color="primary" onClick={onSubmit}>
                  {actionTitle}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
}
