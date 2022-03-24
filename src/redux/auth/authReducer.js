import authTypes from "./authTypes";

const INITIAL_STATE = {
  auth_token: "",
  loading: false,
  error: "",
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case authTypes.FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case authTypes.FETCH_USERS_SUCCESS:
      return {
        loading: false,
        error: "",
        auth_token: action.payload,
      };
    case authTypes.FETCH_USERS_FAILURE:
      return {
        loading: false,
        error: action.payload,
        auth_token: "",
      };
    default:
      return state;
  }
};

export default authReducer;
