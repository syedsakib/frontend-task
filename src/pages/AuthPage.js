import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";

import { fetchToken } from "../redux/auth/authActions";
import LoaderComponent from "../component/Spinner";

const AuthPage = ({ authState, fetchToken }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { loading, error, auth_token } = authState;

  useEffect(() => {
    if (auth_token) {
      navigate("devices");
    }
  }, [loading, error, auth_token]);

  const checkIsTokenAvailable = () => {
    setIsLoading(true);
    let token = localStorage.getItem("auth_token");
    if (token) {
      navigate("devices");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    checkIsTokenAvailable();
  }, [isLoading]);

  const onSubmitHandler = async (values) => {
    try {
      await fetchToken(values);
    } catch (e) {
      console.log(e);
    }
  };

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
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          onSubmitHandler(values);
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email().required("Required"),
          password: Yup.string().required("No password provided."),
        })}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
          } = props;
          return (
            <div className="auth-wrapper">
              <div className="auth-inner">
                <form onSubmit={handleSubmit}>
                  <div className="form-title">
                    <h1>Log In</h1>
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      name="email"
                      type="text"
                      placeholder="Enter your email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`form-control ${
                        errors.email && touched.email && "error"
                      }`}
                    />
                    {errors.email && touched.email && (
                      <div className="input-feedback">{errors.email}</div>
                    )}
                  </div>

                  <label htmlFor="email">Password</label>
                  <input
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`form-control ${
                      errors.password && touched.password && "error"
                    }`}
                  />
                  {errors.password && touched.password && (
                    <div className="input-feedback">{errors.password}</div>
                  )}

                  <div className="button-container">
                    <button
                      type="submit"
                      className="btn btn-primary btn-block"
                      disabled={isSubmitting}
                    >
                      LOG IN
                    </button>
                  </div>
                </form>
              </div>
            </div>
          );
        }}
      </Formik>
      <ToastContainer />
    </>
  );
};

const mapStateToProps = (state) => ({
  authState: state.auth,
});

const mapDispatchToProps = {
  fetchToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);
