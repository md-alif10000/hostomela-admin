import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { addTicket, deleteProductById } from "../../../actions";
import Swal from "sweetalert2";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import {
  FormControl,
  TextField,
  Button,
} from "@material-ui/core";

import { Redirect } from "react-router";

//  export function productPicture(files) {
//    setProductPictures(files);
//  }

export default function AddNewTicket(props) {
  const [ticketImage, setTicketImage] = useState(null);
  const [title, setTitle] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [startAt, setStartAt] = useState("");
  const [arriveAt, setArriveAt] = useState("");
  const [ac, setAc] = useState(false);
  const [price, setPrice] = useState("");
  const [coach, setCoach] = useState("");

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

  const submitTicketForm = () => {
    const form = new FormData();

    form.append("title", title);
    form.append("coach", coach);
    form.append("price", price);
    form.append("from", from);
    form.append("to", to);
    form.append("ac", ac);
    form.append("startAt", startAt);
    form.append("arriveAt", arriveAt);
    form.append("ticketImage", ticketImage);

    if (title == "")
      return Swal.fire(
        "Oops...",
        "<h3>Product Neme is required..!</h3>",
        "error"
      );

    if (price == "")
      return Swal.fire("Oops...", "<h3>Price is required..!</h3>", "error");
    if (from == "")
      return Swal.fire("Oops...", "Starting point is required..!", "error");
    if (to == "")
      return Swal.fire("Oops...", "Destination is required.!", "error");

console.log(form)
dispatch(addTicket(form))
    setTitle("");
    setCoach("");
    setPrice("");
    setFrom("");
    setTo("");
    setTicketImage([]);
  };

  const handleTicketImage = (e) => {
    setTicketImage(e.target.files[0]);
  };

  if (!auth.authenticate) return <Redirect to={"/login"} />;

  return (
    <div className="text-center m-auto ">
      <div
        className="col-md-6 col=lg-8 col-sm-10 p-5 "
        style={{ border: "5px solid black" }}
      >
        <form>
          <TextField
            id="standard-full-width"
            label="Label"
            style={{ margin: 8 }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
                label="Coach"
                value={coach}
                onChange={(e) => setCoach(e.target.value)}
                variant="filled"
              />
            </div>
            <div className="col">
              <TextField
                id="filled-name"
                label="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                variant="filled"
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <TextField
                id="filled-name"
                label="From"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                variant="filled"
              />
            </div>
            <div className="col">
              <TextField
                id="filled-name"
                label="To"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                variant="filled"
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <TextField
                id="filled-name"
                label="Start At"
                value={startAt}
                onChange={(e) => setStartAt(e.target.value)}
                variant="filled"
              />
            </div>
            <div className="col">
              <TextField
                id="filled-name"
                label="Arrive At"
                value={arriveAt}
                onChange={(e) => setArriveAt(e.target.value)}
                variant="filled"
              />
            </div>
          </div>

          <div className='m-5'>
            <FormControl component="fieldset">
              <FormLabel component="legend">AC</FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender1"
                value={ac}
                onChange={(e) => setAc(e.target.value)}
              >
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="yes"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="no"
                />
              </RadioGroup>
            </FormControl>
          </div>

          <div style={{ margin: "50px", textAlign: "center" }}>
            <input
              type="file"
              name="ticketImage"
              onChange={handleTicketImage}
              multiple
            />
          </div>
          <div className="text-center mb-5">
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={submitTicketForm}
              >
                Add new Ticket
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
