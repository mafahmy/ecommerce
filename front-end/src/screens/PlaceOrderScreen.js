import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate, Link } from "react-router-dom";
//import { createOrder } from "../actions/orderAction";
import CheckoutSteps from "../components/CheckoutSteps";
import { getTotals } from "../features/cart/cartSlice3";
import { createOrder, resetOrder } from "../features/orders/ordersSlice";
//import { ORDER_CREATE_RESET } from "../constants/orderConstant";

const PlaceOrderScreen = () => {
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderCreate = useSelector((state) => state.orders);
  const { isLoading, success, error, order } = orderCreate;

  useEffect(() => {
    dispatch(getTotals());
    if (success) {
      navigate(`/order/${order._id}`);
      // dispatch(resetOrder());
    }
  }, [dispatch, navigate, order, success]);

  if (!cart.shippingAddress.address) {
    return <Navigate to="/payment" />;
  }
  // const toPrice = (num) => {
  //   return Number(num.toFixed(2));
  // };
  // cart.itemsPrice = toPrice(
  //   cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  // );
  // cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 10;
  // cart.totalPrice = toPrice(cart.itemsPrice + cart.shippingPrice);

  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Shipping</h2>
                <p>
                  <strong>Name:</strong>
                  {cart.shippingAddress.fullName} <br />
                  <strong>Address:</strong>
                  {cart.shippingAddress.address},{cart.shippingAddress.city},
                  {cart.shippingAddress.postalCode},
                  {cart.shippingAddress.country},
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong>
                  {cart.paymentMethod}
                  <br />
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Order Items</h2>
                <ul>
                  {cart.cartItems.map((item) => (
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
                  <div>${cart.itemsPrice}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>${cart.shippingPrice}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Total</div>
                  <div>${cart.totalPrice}</div>
                </div>
              </li>
              <li>
                <button
                  type="button"
                  onClick={placeOrderHandler}
                  className="primary block"
                  disabled={cart.cartItems.length === 0}
                >
                  Place Order
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PlaceOrderScreen;
