import axios from "../helpers/axios";
import { ticketConstants } from "./constants";
import Swal from "sweetalert2";

export const addTicket = (form) => {
  return async (dispatch) => {
    try {
      console.log(form);
      dispatch({ type: ticketConstants.ADD_NEW_TICKET_REQUEST });
      const res = await axios.post(`ticket/addTicket`, form);
      if (res.status == 201) {
        dispatch({ type: ticketConstants.ADD_NEW_TICKET_SUCCESS });
        Swal.fire("Great...", "Ticket added successfully...!", "success");
       
      } else {
        dispatch({ type: ticketConstants.ADD_NEW_TICKET_FAILURE });

        Swal.fire("Oops...", "Something went wrong.!", "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
