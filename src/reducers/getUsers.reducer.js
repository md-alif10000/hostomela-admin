import { getUsers } from "../actions/constants";

const initState = {
  users: [],
  loading: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case getUsers.GET_ALL_USERS_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case getUsers.GET_ALL_USERS_SUCCESS:
      state = {
        ...state,
        users:action.payload.users,
        loading: false,
      };
      break;
    case getUsers.GET_ALL_USERS_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
  }
  return state;
};
