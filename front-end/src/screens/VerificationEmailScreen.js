import React, { useEffect } from "react";
import { useFormik } from "formik";

import * as Yup from "yup";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { verification } from "../features/users/userVerificationSlice";

const VerificationEmailScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();

  // const redirectUrl = new URLSearchParams(search).get("redirect");
  // const redirect = redirectUrl ? redirectUrl : "/";
  const userSignin = useSelector((state) => state.log);
  const { userInfo, isLoading, error, isLoggedIn } = userSignin;

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

      dispatch(verification({ email }));
    },
  });
  // useEffect(() => {
  //   if (userInfo && isLoggedIn) {
  //     navigate(redirect);
  //   }
  // }, [isLoggedIn, navigate, redirect, userInfo]);

  return (
    <Container maxWidth="lg" disableGutters>
      <div className="row center">
        {isLoading && (
          <Box sx={{ display: "flex", alignItem: "center" }}>
            <CircularProgress />
          </Box>
        )}
      </div>

      <form className="form" onSubmit={formik.handleSubmit}>
        <div>
          <h1>Verify Email</h1>
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
        {/* <div>
          {" "}
          {error && (
            <Alert severity="error">
              <AlertTitle>wrong email or Password</AlertTitle>
              {error}
            </Alert>
          )}
          <label />
          
        </div> */}
      </form>
    </Container>
  );
};

export default VerificationEmailScreen;
