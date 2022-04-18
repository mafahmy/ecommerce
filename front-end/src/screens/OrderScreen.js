import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate, Link, useParams } from "react-router-dom";
import { detailsOrder } from "../features/orders/orderDetailsSlice";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { orderPayReset, payOrder } from "../features/orders/orderPaySlice";

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, isLoading, error } = orderDetails;
  const [sdkReady, setSdkReady] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderPay = useSelector((state) => state.orderPay);
  const {
    error: errorPay,
    success: successPay,
    isLoading: isLoadingPay,
  } = orderPay;
  
  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await axios.get("http://localhost:4000/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    
    if (!order || successPay || (order && order._id !== orderId)) {
      dispatch(orderPayReset());
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, order, orderId, successPay]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };

  return isLoading ? (
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>
  ) : error ? (
    <Alert variant="filled" color='red' severity="error">
      {error}
    </Alert>
  ) : (
    <div>
      <h1>Order {order._id}</h1>
      <div className="row top">
        <div className="col-1">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Shipping</h2>
                <p>
                  <strong>Name:</strong>
                  {order.shippingAddress.fullName} <br />
                  <strong>Address:</strong>
                  {order.shippingAddress.address},{order.shippingAddress.city},
                  {order.shippingAddress.postalCode},
                  {order.shippingAddress.country},
                </p>
                {order.isDelivered ? (
                  <Alert variant="filled" severity="success">
                    Delivered at {order.deliveredAt}
                  </Alert>
                ) : (
                  <Alert variant="filled" severity="warning">
                    Not Delivered
                  </Alert>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong>
                  {order.paymentMethod}
                  <br />
                </p>
                {order.isPaid ? (
                  <Alert variant="filled" severity="success">
                    Paid at {order.paidAt}
                  </Alert>
                ) : (
                  <Alert variant="filled" severity="warning">
                    Not Paid
                  </Alert>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Order Items</h2>
                <ul>
                  {order.orderItems.map((item) => (
                    <li key={item.product}>
                      <div className="row">
                        <div>
                          <img
                            className="small"
                            src={item.image}
                            alt={item.name}
                          ></img>
                        </div>
                        <div className="min-30">
                          <Link to={`product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>

                        <div>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>Items</div>
                  <div>${order.itemsPrice}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>${order.shippingPrice}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Total</div>
                  <div>${order.totalPrice}</div>
                </div>
              </li>
              {!order.isPaid && (
                <li>
                  {!sdkReady ? (
                <Box sx={{ display: "flex" }}>
                  <CircularProgress />
                </Box>
                  ):(
                <>
                  {errorPay && (
                    <Alert variant="filled" severity="error">
                      {error}
                    </Alert>
                  )}
                  {isLoadingPay && (
                    <Box sx={{ display: "flex" }}>
                      <CircularProgress />
                    </Box>
                  )}
                  <PayPalButton
                    amount={order.totalPrice}
                    onSuccess={successPaymentHandler} >
                  </PayPalButton>
                </>
              )}
              </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderScreen;
