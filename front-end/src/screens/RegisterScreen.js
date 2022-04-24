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


const RegisterScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();

  const redirectUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectUrl ? redirectUrl : "/";
  const userRegister = useSelector((state) => state.register);
  const { userInfo, isLoading, error, isLoggedIn } = userRegister;

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validationSchema: Yup.object().shape({
      name: Yup.string().required("This field is required!"),
      email: Yup.string().email('Must be a valid email').required('This field is required!'),
      password: Yup.string().required("This field is required!").min(8, 'Password is to short - must be 8 chars.').
      matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"),
      confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
    }),
    onSubmit: (values) => {
      const { name, email, password } = values;

      dispatch(register({ name, email, password }));
    },
  });
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <Container maxWidth="lg" disableGutters="true">
      <div className="row center">
      {isLoading && (
        <Box sx={{ display: "flex", alignItem:"center" }}>
        <CircularProgress />
      </Box>
      )}
      {error && (
            <Alert severity="error">
              <AlertTitle>wrong email or Password</AlertTitle>
              {error}
            </Alert>
          )}
      </div>
    <form className="form"onSubmit={formik.handleSubmit}>
      <div>
        <h1>Create an Account</h1>
      </div>
      <div>
        <label htmlFor="name"></label>
        <input
          name="name"
          type="text"
          id="name"
          placeholder="Enter name"
          onChange={formik.handleChange}
          value={formik.values.name}
        ></input>
        {formik.touched.name && formik.errors.name ? (
          <div>{formik.errors.name}</div>
        ) : null}
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
          Register
        </button>
      </div>
      <div>
        <label />
        <div>
          <Link to={`/signin?redirect=${redirect}`}>
            Already have an account
          </Link>
        </div>
      </div>
    </form>
    </Container>
  );
};

export default RegisterScreen;
