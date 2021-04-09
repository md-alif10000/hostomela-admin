import { applyMiddleware, createStore,compose } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from "../reducers";
import initialState from "../reducers";


  // compose(
  //   window.__REDUX_DEVTOOLS_EXTENSION__ &&
  //     window.__REDUX_DEVTOOLS_EXTENSION__(),
  //   applyMiddleware(thunk)
  // );

  // const initialState = {
  //   sidebarShow: "responsive",
  //   rootReducer
  // };

  const changeState = (state = initialState, { type, ...rest }) => {
    switch (type) {
      case "set":
        return { ...state, ...rest };
      default:
        return state;
    }
  };



const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store