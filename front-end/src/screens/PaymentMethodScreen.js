import React, { useState } from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { useFormik } from "formik";
import { savePaymentMethod } from "../features/cart/cartSlice3";

const PaymentMethodScreen = () => {
  // const [paymentMethod, setPaymentMethod] = useState('paypal');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const userSignin = useSelector((state) => state.log);
  const { isLoggedIn, userInfo } = userSignin;

  const formik = useFormik({
    initialValues:{
      paymentMethod: 'paypal'
    }, 
    onSubmit: (values) => {
      dispatch(savePaymentMethod(values.paymentMethod));
      navigate("/placeorder");
    },
  });

  if (!shippingAddress.address) {
    return <Navigate to="/shipping" />;
  }
  // const submitHandler = (e) => {
  //     e.preventDefault();
  //     dispatch(savePaymentMethod(paymentMethod));
  //     navigate('/placeorder');
  // }
  
  if (!isLoggedIn) {
    return <Navigate to='/' />
  }
  return (
    <div>
      <CheckoutSteps step1 step2 step3 />
      <form className="form" onSubmit={formik.handleSubmit}>
        <div>
          <h1>Payment</h1>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="paypal"
              value="paypal"
              name="paymentMethod"
              required
              checked
              onChange={formik.handleChange}
            ></input>
            <label htmlFor="paypal">Paypal</label>
          </div>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="cashOnDelivery"
              value="cashOnDelivery"
              name="paymentMethod"
              required
              onChange={formik.handleChange}
            ></input>
            <label htmlFor="cashOnDelivery">Cash On Delivery</label>
          </div>
        </div>
        <div>
          <button className="primary" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};
export default PaymentMethodScreen;
