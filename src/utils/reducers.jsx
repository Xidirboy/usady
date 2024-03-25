// import _ from "lodash";

const INITIAL_STATE = {
  loading: false,
  user: {},
  auth_modal: false,
};

const reducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: action?.payload,
      };
    case "SET_USER":
      return {
        ...state,
        user: action?.payload,
      };
    case "SET_AUTH_MODAL":
      return {
        ...state,
        auth_modal: action?.payload,
      };
    default:
      return state;
  }
};
export default reducers;
