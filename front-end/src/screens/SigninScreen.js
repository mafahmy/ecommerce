import React, { useEffect, useState } from "react";
import { useFormik } from 'formik';

import * as Yup from "yup";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import  { login }  from "../features/users/userLogSlice";

const SigninScreen = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();

  const redirectUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectUrl ? redirectUrl: '/';
  const userSignin = useSelector((state) => state.log);
  const { userInfo, isLoading, error, isLoggedIn } = userSignin;

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',

    },
  

   validationSchema : Yup.object().shape({
      email: Yup.string().required('This field is required!'),
      password: Yup.string().required('This field is required!')
  }),
  onSubmit: values => {
    const { email, password} = values
    
    dispatch(login({email, password}));
  },
}
  );
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  },[navigate, redirect, userInfo]);
  
  return (

      <form onSubmit={formik.handleSubmit}>
        <div>
          <h1>Sign In</h1>
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
          {formik.touched.email && formik.errors.email ?(
            <div>{formik.errors.email}</div>
          ): null}
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
          >
         
          </input>
          {formik.touched.email && formik.errors.email ?(
            <div>{formik.errors.email}</div>
          ): null}
        </div>
        <div>
        <label />
          <button type="submit" className="primary block">
            Login
          </button>
          </div>
          <div>
            <label/>
            <div>
              <Link to={`/register?redirect=${redirect}`}>Create an account</Link>
            </div>
          </div>
      </form>
   
  );
};

export default SigninScreen;
