import { combineReducers } from "redux";

import authReducer from "./auth/authReducer";
import devicesReducer from "./devices/devicesReducer";

export default combineReducers({
  auth: authReducer,
  devices: devicesReducer,
});
