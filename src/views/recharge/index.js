import MaterialTable from "material-table";
import { useDispatch, useSelector } from "react-redux";
import { getAllRecharges,updateRecharge } from "../../actions/recharge.action";
import Modal from "../components/UI/Modal";
import CreateRoundedIcon from "@material-ui/icons/CreateRounded";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";

import React, { useEffect, useState } from "react";

export default function Recharges(props) {
  const [rechargeUpdateModal, setRechargeUpdateModal] = useState(false);
  const [rechargeId, setRechargeId] = useState('')
  const [status, setStatus] = useState('')
  const dispatch = useDispatch();
  const recharges = useSelector((state) => state.recharges);

  const handleCloseRechargeUpdateModal = () => {
    setRechargeUpdateModal(false);
  };
  const showRechargeUpdateModal = (recharge) => {
    setRechargeId(recharge._id)
    console.log(rechargeId)
    renderRechargeUpdateModal(recharge);
    setRechargeUpdateModal(true);
  };


const updateUserRecharge=()=>{
  console.log({rechargeId,status})
    
    dispatch(updateRecharge({rechargeId,status}))
    // dispatch(getAllRecharges())
    setRechargeUpdateModal(false)
  }

  const renderRechargeUpdateModal = () => {
    return (
      <Modal
        show={rechargeUpdateModal}
        handleClose={handleCloseRechargeUpdateModal}
        modalTitle={"Product Details"}
      >
        <FormControl component="fieldset">
          <FormLabel component="legend">
            <h4>Update Recharge</h4>
          </FormLabel>
          <RadioGroup
            aria-label="gender"
            name="gender1"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <FormControlLabel
              value="done"
              control={<Radio />}
              label="Done"
            />
            <FormControlLabel
              value="cancelled"
              control={<Radio />}
              label="Cancelled"
            />
          </RadioGroup>
        </FormControl>
        <div>

          <Button color="" style={{backgroundColor:'green'}} variant='primary' onClick={updateUserRecharge}>
            Update
          </Button>
        </div>
      </Modal>
    );
  };

  const columns = [
    { title: "Number", field: "number" },
    { title: "Amount", field: "amount" },
    {
      title: "Sim-Type",
      field: "type",
    },
    {
      title: "Provider",
      field: "provider",
      // render: (row) => row.category && row.category.name,
    },

    {
      title: "Status",
      field: "status",
      render: (recharge) => (
        <div>
          {recharge.status == "done" ? (
            <span
              style={{
                backgroundColor: "green",
                padding: "5px",
                borderRadius: "5px",
              }}
            >
              Done
            </span>
          ) : recharge.status == "cancelled" ? (
            <span
              style={{
                backgroundColor: "red",
                padding: "5px",
                borderRadius: "5px",
              }}
            >
              Cancelled
            </span>
          ) : (
            <span
              style={{
                backgroundColor: "orange",
                padding: "5px",
                borderRadius: "5px",
              }}
            >
              Pending
            </span>
          )}
        </div>
      ),
    },
    {
      title: "Action",
      field: "action",
      render: (recharge) => (
        <CreateRoundedIcon
          style={{ margin: "0 5px", cursor: "pointer" }}
          color="green"
          onClick={() => showRechargeUpdateModal(recharge)}
        />
      ),
    },
  ];

  useEffect(() => {
    dispatch(getAllRecharges());
  }, []);

  return (
    <>
      {renderRechargeUpdateModal()}

      <MaterialTable
        title="All Products"
        data={recharges.recharges}
        columns={columns}
        options={{
          search: true,
          filtering: true,
          exportButton: true,

          // selection: true,
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
