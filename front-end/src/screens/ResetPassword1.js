import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../features/users/userRegisterSlice";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { verifyPassLink } from "../features/users/passLinkSlice";

const ResetPassword1 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, error, success, passLink } = useSelector(
    (state) => state.passLink
  );

  const formik = useFormik({
    initialValues: {
      email: "",
    },

    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Must be a valid email")
        .required("This field is required!"),
    }),
    onSubmit: (values) => {
      const { email } = values;

      dispatch(verifyPassLink({ email }));
    },
  });
  // useEffect(() => {
  //   if (success) {
  //     navigate("/");
  //   }
  // }, [navigate, success]);

  return (
    <Container maxWidth="lg" disableGutters>
      <div className="loginBack">
        <div className="row center">
          {isLoading && (
            <Box sx={{ display: "flex", alignItem: "center" }}>
              <CircularProgress />
            </Box>
          )}
          {error && (
            <Alert severity="error">
              <AlertTitle>un able to register now!</AlertTitle>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success">
              <AlertTitle>Email sent to {formik.values.email}</AlertTitle>
            </Alert>
          )}
        </div>
        <form className="form" onSubmit={formik.handleSubmit}>
          <div>
            <h1>Enter your Email</h1>
          </div>

          <div>
            <label htmlFor="email"></label>
            <input
              name="email"
              type="email"
              id="email"
              placeholder="Enter email"
              onChange={formik.handleChange}
              value={formik.values.email}
            ></input>
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}
          </div>
          <div>
            <label />
            <button type="submit" className="primary">
              Send Link
            </button>
          </div>
          <div>
            <label />
            {/* <div>
          <Link to={`/signin?redirect=${redirect}`}>
            Already have an account
          </Link>
        </div> */}
          </div>
        </form>
      </div>
    </Container>
  );
};

export default ResetPassword1;
