import authTypes from "./authTypes";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export const fetchUserRequest = () => {
  return {
    type: authTypes.FETCH_USERS_REQUEST,
  };
};

export const fetchUserSuccess = (users) => {
  return {
    type: authTypes.FETCH_USERS_SUCCESS,
    payload: users,
  };
};

export const fetchUserFailure = (error) => {
  return {
    type: authTypes.FETCH_USERS_FAILURE,
    payload: error,
  };
};

export const fetchToken =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      dispatch(fetchUserRequest());
      let result = await axios.post("http://35.201.2.209:8000/login", {
        email,
        password,
      });
      console.log("result.data", result.data);
      const token = result.data;
      localStorage.setItem("auth_token", token);
      dispatch(fetchUserSuccess(token));
      toast("Logged In Successfully");
    } catch (error) {
      const errormessage = error.message;
      dispatch(fetchUserFailure(errormessage));
      toast("Something went wrong, Please try again");
    }
  };
