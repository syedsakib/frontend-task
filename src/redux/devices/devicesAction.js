import devicesTypes from "./devicesTypes";
import httpBackend from "../apis/httpBackend";
//import { ToastContainer, toast } from "react-toastify";

export const fetchDevicesRequest = () => {
  return {
    type: devicesTypes.FETCH_DEVICES_REQUEST,
  };
};

export const fetchDevicesSuccess = (devicess) => {
  return {
    type: devicesTypes.FETCH_DEVICES_SUCCESS,
    payload: devicess,
  };
};

export const fetchDevicesFailure = (error) => {
  return {
    type: devicesTypes.FETCH_DEVICES_FAILURE,
    payload: error,
  };
};

export const getDevicesFromApi = () => async (dispatch) => {
  try {
    dispatch(fetchDevicesRequest());
    let result = await httpBackend.get(`/devices`);
    console.log("result.data", result.data);
    const devices = result.data;
    dispatch(fetchDevicesSuccess(devices));
  } catch (error) {
    const errormessage = error.message;
    dispatch(fetchDevicesFailure(errormessage));
  }
};

export const postNotify = () => async (dispatch) => {
  try {
    dispatch(fetchDevicesRequest());
    let result = await httpBackend.get(`/devices`);
    console.log("result.data", result.data);
    const devices = result.data;
    dispatch(fetchDevicesSuccess(devices));
  } catch (error) {
    const errormessage = error.message;
    dispatch(fetchDevicesFailure(errormessage));
  }
};
