import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";

import { fetchToken, notifyPost } from "../redux/auth/authActions";
import { getDevicesFromApi } from "../redux/devices/devicesAction";

import DevicesLogo from "../redux/devices/circle.svg";
import LoaderComponent from "../component/Spinner";

const DevicesPages = ({ devicesState, getDevicesFromApi, notifyPost }) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const { loading, details } = devicesState;

  const getDevices = async () => {
    try {
      setInterval(async () => {
        await getDevicesFromApi();
      }, 5000);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getDevices();
  }, []);

  const logOutHandler = () => {
    localStorage.removeItem("auth_token");
    navigate("/");
  };

  const notifyHandler = async () => {
    let name = `Syed Nazmus Shakib`;
    let email = `sakibsyed01@gmail.com`;
    let repoUrl = `as`;
    let message = `Hello, this is the finished task from me. Hope to hear from you soon.`;

    try {
      await notifyPost({ name, email, repoUrl, message });
    } catch (e) {
      console.log(e);
    }
  };

  const checkIsTokenAvailable = () => {
    setIsLoading(true);
    let token = localStorage.getItem("auth_token");
    if (!token) {
      navigate("/");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    checkIsTokenAvailable();
  }, [isLoading]);

  if (isLoading)
    return (
      <div>
        <LoaderComponent />
      </div>
    );

  if (loading)
    return (
      <div>
        <LoaderComponent />
      </div>
    );

  return (
    <>
      <div className="container pt-5">
        <div>
          <div className="row">
            {details?.devices?.map((device, index) => {
              return (
                <div key={device.id} className="col-md-3 device-box">
                  <img src={DevicesLogo} alt="Device Logo" />
                  <p className="device-title">{device?.name}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="device-length">
          <p>{`Devices Online: ${details?.devices?.length}`} </p>
        </div>
        <div className="d-flex justify-content-center">
          <button className="btn btn-primary" onClick={() => notifyHandler()}>
            NOTIFY
          </button>
          <button className="btn btn-info mx-4" onClick={() => logOutHandler()}>
            LOG OUT
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

const mapStateToProps = (state) => ({
  authState: state.auth,
  devicesState: state.devices,
});

const mapDispatchToProps = {
  fetchToken,
  getDevicesFromApi,
  notifyPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(DevicesPages);
