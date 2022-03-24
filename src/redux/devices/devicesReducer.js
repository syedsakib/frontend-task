import devices from "./devicesTypes";

const INITIAL_STATE = {
  details: [],
  loading: false,
  error: "",
};

const devicesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case devices.FETCH_DEVICES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case devices.FETCH_DEVICES_SUCCESS:
      return {
        loading: false,
        error: "",
        details: action.payload,
      };
    case devices.FETCH_DEVICES_FAILURE:
      return {
        loading: false,
        error: action.payload,
        details: [],
      };
    default:
      return state;
  }
};

export default devicesReducer;
