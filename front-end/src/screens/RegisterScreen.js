import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../features/users/userRegisterSlice";

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
    },

    validationSchema: Yup.object().shape({
      name: Yup.string().required("This field is required!"),
      email: Yup.string().required("This field is required!"),
      password: Yup.string().required("This field is required!"),
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
    <form onSubmit={formik.handleSubmit}>
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
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}
      </div>
      <div>
        <label />
        <button type="submit" className="primary block">
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
  );
};

export default RegisterScreen;
