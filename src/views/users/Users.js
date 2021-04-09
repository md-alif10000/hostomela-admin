import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import { deleteProductById } from "../../actions/product.action";
import { Redirect } from "react-router";
import { Row, Col } from "react-bootstrap";
import Modal from "../components/UI/Modal";
import { generatePublicUrl } from "src/urlconfig";
import VisibilityIcon from "@material-ui/icons/Visibility";
import CreateRoundedIcon from "@material-ui/icons/CreateRounded";


export default function Users() {
  const AllUsers = useSelector(state => state.AllUsers)
  const {users}=AllUsers;
  const Users=[]
  users.map((user,index)=>{
    Users.push(user)
  })


   const formatDate = (createdAt) => {
     if (createdAt) {
       const d = new Date(createdAt);
       return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
     }
     return createdAt;
   };



    const columns = [
      { title: "User's Name", field: "name" },
      { title: "username", field: "username" },
      { title: "Phone", field: "phone" },
      { title: "Email", field: "email" },
      { title: "Role", field: "role" },
      { title: "Gender", field: "gender" },
      { title: "Joined On", field: "createdAt",
      // render:(user)=>{
      //   const {createdAt}=user
      //     formatDate(createdAt)
      // }
     },
      { title: "Status", field: "status" },

      {
        title: "Update",
        field: "category",
        render: (row) => (
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <VisibilityIcon
              style={{ margin: "0 5px", cursor: "pointer" }}
              variant="contained"
              color="yellow"
            />
            <CreateRoundedIcon
              style={{ margin: "0 5px", cursor: "pointer" }}
              variant="contained"
              color="green"
            />
            <DeleteIcon
              style={{ margin: "0 10px", cursor: "pointer" }}
              variant="contained"
              color="secondary"
            />
          </div>
        ),
      },
    ];





  return (
    <div>
      <MaterialTable
        title="All Products"
        data={Users}
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
    </div>
  );
}
