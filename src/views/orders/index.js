import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { useDispatch, useSelector } from "react-redux";
import { updateOrder } from "../../actions/orders.action";
import Button from "@material-ui/core/Button";
import {} from "../../actions/orders.action";
import { Redirect } from "react-router";

import MODAL from "../components/UI/Modal";
import { generatePublicUrl } from "src/urlconfig";
import VisibilityIcon from "@material-ui/icons/Visibility";
import CreateRoundedIcon from "@material-ui/icons/CreateRounded";

export default function Orders(props) {
  const [orderUpdateModal, setOrderUpdateModal] = useState(true);
  const customersOrder = useSelector((state) => state.order);
  const [singleOrder, setSingleOrder] = useState('')
  const order = useSelector((state) => state.order);
  const { orders } = customersOrder;
  const AllOrders = [];
  orders.map((order, index) => {
    AllOrders.push(order);
  });

  const columns = [
    {
      title: "Order,s Items",
      field: "name",
      render: (order) => {
        const { items } = order;
        return items.forEach((item) => {
          <p>{item.name}</p>;
        });
      },
    },
    { title: "Total Price", field: "totalAmount" },
    {
      title: "Stock",
      field: "paymentStatus",
    },
    {
      title: "Payment Type",
      field: "paymentType",
    },
    {
      title: "Payment Type",
      field: "paymentType",
      //   render:(order)=>{const {orderStatus}=order;
      //   const  AllStatus=[];
      //   orderStatus.map((status,index)=>{
      //       AllStatus.push(status)
      //   })
      //   console.log(AllStatus)
      //     const Status=AllStatus.filter(isCompleted);
      //     return Status
      // }
    },

    {
      title: "Actions",
      field: "category",
      render: (singleOrder) => (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <VisibilityIcon
            style={{ margin: "0 5px", cursor: "pointer" }}
            variant="contained"
            color="yellow"
            // onClick={() => showOrderDetailsModal(row)}
          />

          <Button
            onClick={() =>
              // console.log(orderItem)
              setSingleOrder(singleOrder).then(() => {
                console.log(singleOrder)
                showOrderUpdateModal(singleOrder);
              })
            }
          >
            <CreateRoundedIcon
              style={{ margin: "0 5px", cursor: "pointer" }}
              variant="contained"
              color="green"
            />
          </Button>
        </div>
      ),
    },
  ];

  const [type, setType] = useState("");
  const dispatch = useDispatch();

  const onOrderUpdate = (orderId) => {
    const payload = {
      orderId,
      type,
    };
    dispatch(updateOrder(payload));
  };

  const formatDate = (date) => {
    if (date) {
      const d = new Date(date);
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    }
    return "";
  };

  const showOrderDetailsModal=()=>{

  }

  const showOrderUpdateModal = (singleOrder) => {
    setOrderUpdateModal(true);
    renderOrderUpdateModal();
  };
  const handleCloseOrderUpdateModal = () => {
    setOrderUpdateModal(false);
  };

  const renderOrderUpdateModal = () => {
    return (
      <MODAL
        show={orderUpdateModal}
        handleClose={handleCloseOrderUpdateModal}
        modalTitle={"View & Update Order"}
        size="lg"
      >
        <div>
          {console.log(singleOrder)}
          {/* {console.log(orderItem)} */}
          {console.log(singleOrder._id)}
          <h2>{singleOrder._id}</h2>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "50px 50px",
              alignItems: "center",
            }}
          >
            {/* <div>
              <div className="title">Items</div>
              {singleOrder.items.map((item, index) => (
                <div className="value" key={index}>
                  {item.productId.name}
                </div>
              ))}
            </div> */}
            <div>
              <span className="title">Total Price</span>
              <br />
              <span className="value">{singleOrder.totalAmount}</span>
            </div>
            <div>
              <span className="title">Payment Type</span> <br />
              <span className="value">{singleOrder.paymentType}</span>
            </div>
            <div>
              <span className="title">Payment Status</span> <br />
              <span className="value">{singleOrder.paymentStatus}</span>
            </div>
          </div>
          <div
            style={{
              boxSizing: "border-box",
              padding: "100px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div className="orderTrack">
              {singleOrder.orderStatus.map((status) => (
                <div
                  className={`orderStatus ${
                    status.isCompleted ? "active" : ""
                  }`}
                >
                  <div
                    className={`point ${status.isCompleted ? "active" : ""}`}
                  ></div>
                  <div className="orderInfo">
                    <div className="status">{status.type}</div>
                    <div className="date">{formatDate(status.date)}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* select input to apply order action */}
            <div
              style={{
                padding: "0 50px",
                boxSizing: "border-box",
              }}
            >
              <select onChange={(e) => setType(e.target.value)}>
                <option value={""}>select status</option>
                {singleOrder.orderStatus.map((status) => {
                  return (
                    <>
                      {!status.isCompleted ? (
                        <option key={status.type} value={status.type}>
                          {status.type}
                        </option>
                      ) : null}
                    </>
                  );
                })}
              </select>
            </div>
            {/* button to confirm action */}

            <div
              style={{
                padding: "0 50px",
                boxSizing: "border-box",
              }}
            >
              {console.log("aliffffff")}
              <button onClick={() => onOrderUpdate(singleOrder._id)}>
                confirm
              </button>
            </div>
          </div>
          ))
        </div>
      </MODAL>
    );
  };

  return (
    <>
      {renderOrderUpdateModal(singleOrder)}
      <MaterialTable
        title="All Products"
        data={AllOrders}
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
}
