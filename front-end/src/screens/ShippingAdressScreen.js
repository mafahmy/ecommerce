import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";

import CheckoutSteps from "../components/CheckoutSteps";
import { useFormik } from "formik";
import * as Yup from "yup";
import { saveShippingAddress } from "../features/cart/cartSlice3";


const ShippingAddressScreen = () => {

    

    //const [fullName, setFullName] = useState('');
    //const [address, setAddress] = useState('');
    //const [city, setCity] = useState('');
    //const [country, setCountry] = useState('');
    //const [postalCode, setPostalCode] = useState('');

    const userSignin = useSelector((state) => state.log);
    const { userInfo, isLoading, error, isLoggedIn } = userSignin;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            fullName: '',
            address: '',
            city: '',
            country: '',
            postalCode: '',
        },
        validationSchema: Yup.object().shape({
            fullName: Yup.string().required("This field is required!"),
            address: Yup.string().required("This field is required!"),
            city: Yup.string().required("This field is required!"),
            country: Yup.string().required("This field is required!"),
            postalCode: Yup.string().required("This field is required!"),
        }),
        onSubmit: (values) => {
            const { fullName, address, city, country, postalCode } = values;
            dispatch(saveShippingAddress({fullName, address, city, postalCode, country}));
            navigate('/payment')

        }



    },
    
    );

    // const submitHandler = (e) => {
    //     e.preventDefault();
    //     dispatch(saveShippingAddress({ fullName, address, city, postalCode, country }));

    //     navigate('/payment')
    // }

    if (!userInfo) {
       return <Navigate to='/signin' />
    }


  return (
    <div>
      <CheckoutSteps step1 step2 ></CheckoutSteps>
      <form className="form" onSubmit={formik.handleSubmit}>
        <div>
          <h1>Shipping Address</h1>
        </div>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            placeholder="full name"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            required
          ></input>
                  {formik.touched.fullName && formik.errors.fullName ? (
          <div>{formik.errors.fullName}</div>
        ) : null}
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            placeholder="Enter Address"
            value={formik.values.address}
            onChange={formik.handleChange}
            required
          ></input>
                  {formik.touched.address && formik.errors.address ? (
          <div>{formik.errors.address}</div>
        ) : null}
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            placeholder="Enter CITY"
            value={formik.values.city}
            onChange={formik.handleChange}
            required
          ></input>
                  {formik.touched.city && formik.errors.city ? (
          <div>{formik.errors.city}</div>
        ) : null}
        </div>
        <div>
          <label htmlFor="postalCode">Postal Code</label>
          <input
            type="text"
            id="postalCode"
            placeholder="Enter postal code"
            value={formik.values.postalCode}
            onChange={formik.handleChange}
            required
          ></input>
                  {formik.touched.postalCode && formik.errors.postalCode ? (
          <div>{formik.errors.postalCode}</div>
        ) : null}
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            placeholder="Enter Country"
            value={formik.values.country}
            onChange={formik.handleChange}
            required
          ></input>
                  {formik.touched.country && formik.errors.country ? (
          <div>{formik.errors.country}</div>
        ) : null}
        </div>
        <div>
            <label />
            <button className="primary" type="submit">
                Continue
            </button>
        </div>
      </form>
    </div>
  );
};
export default ShippingAddressScreen;
