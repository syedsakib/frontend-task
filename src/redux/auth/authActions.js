import authTypes from "./authTypes";
import httpBackend from "../apis/httpBackend";
import { toast } from "react-toastify";

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
      let result = await httpBackend.post("/login", {
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

export const checkIsTokenAvailable = () => async (dispatch) => {
  try {
    let token = localStorage.getItem("auth_token");
    if (!token) {
      dispatch(fetchToken());
    }
  } catch (error) {
    const errormessage = error.message;
    console.log(errormessage);
  }
};

export const notifyPost =
  ({ name, email, repoUrl, message }) =>
  async (dispatch) => {
    try {
      let result = await httpBackend.post("/notify", {
        name,
        email,
        repoUrl,
        message,
      });
      console.log("result.data", result.data);
      toast("Notified Successfully");
    } catch (error) {
      const errormessage = error.message;
      console.log(errormessage);
      toast("Something went wrong, Please try again");
    }
  };
