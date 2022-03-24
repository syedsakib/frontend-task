import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";

import { fetchToken } from "../redux/auth/authActions";

const AuthPage = ({ authState, fetchToken }) => {
  const navigate = useNavigate();
  //   const userData = useSelector((state) => state.auth);

  const { loading, error, auth_token } = authState;

  //console.log({ loading, error, auth_token });

  const dispatch = useDispatch();

  useEffect(() => {
    // if (auth_token) {
    //   navigate("devices");
    // }
  }, [loading, error, auth_token]);

  const onSubmitHandler = async (values) => {
    try {
      let result = await fetchToken(values);
      console.log("dashboardLogin", result);
    } catch (e) {
      console.log(e);
    }
  };

  if (loading)
    return (
      <div>
        <h2>LOADING COMPONENT</h2>
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
