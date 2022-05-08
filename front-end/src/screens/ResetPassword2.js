import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { resetPasswordNow } from "../features/users/resetPassSlice";

const ResetPassword2 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();
  // const { search } = useLocation();

  // const redirectUrl = new URLSearchParams(search).get("redirect");
  // const redirect = redirectUrl ? redirectUrl : "/";
  const resetPass = useSelector((state) => state.resetPass);
  const { isLoading, error, success, resetPassword } = resetPass;

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },

    validationSchema: Yup.object().shape({
      password: Yup.string()
        .required("This field is required!")
        .min(8, "Password is to short - must be 8 chars.")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords must match"
      ),
    }),
    onSubmit: (values) => {
      const { password } = values;

      dispatch(resetPasswordNow({ token, password }));
    },
  });

  // useEffect(() => {
  //   if () {
  //     navigate(redirect);
  //   }
  // }, [navigate, redirect, userInfo]);

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
              <AlertTitle>Password reset Successfully</AlertTitle>
              {resetPassword.value}
              <Link to="/signin">
                {" "}
                <h2>Sign In Now </h2>{" "}
              </Link>
            </Alert>
          )}
        </div>
        <form className="form" onSubmit={formik.handleSubmit}>
          <div>
            <h1>Create an Account</h1>
          </div>
          <div>
            <label htmlFor="password"></label>
            <input
              name="password"
              type="password"
              id="password"
              placeholder="Enter Password"
              onChange={formik.handleChange}
              value={formik.values.password}
            ></input>
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
          </div>
          <div>
            <label htmlFor="confirm-Password"></label>
            <input
              name="confirmPassword"
              type="password"
              id="confirmPassword"
              placeholder="Enter confirm Password"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
            ></input>
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div>{formik.errors.confirmPassword}</div>
            ) : null}
          </div>
          <div>
            <label />
            <button type="submit" className="primary">
              Reset Password
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

export default ResetPassword2;
