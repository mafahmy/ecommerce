import React from "react";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../features/cart/cartSlice3";
import Alert from "@mui/material/Alert";

const CartScreen = (props) => {
  const { id } = useParams();
  const { search } = useLocation();
  const qtyInUrl = new URLSearchParams(search).get("qty");
  const qty = qtyInUrl ? Number(qtyInUrl) : 1;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  

  const removeFromCartHandler = (item) => {
    dispatch(removeFromCart(item));
  };
  const checkoutHandler = () => {
    navigate("/signin?redirect=/shipping");
  };

  return (
    <div className="row top">
      <div className="col-1">
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Alert variant="filled" severity="info">
            Cart is empty. <Link to="/">Go SHOPPING </Link>
          </Alert>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.product}>
                <div className="row">
                  <div>
                    <img className="small" src={item.image} alt={item.name} />
                  </div>

                  {item.qty}

                  <div className="min-30">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>
                </div>
                <div>${item.price}</div>
                <div>
                  <Link to={`/product/${item.product}`}>ADD MORE</Link>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => removeFromCartHandler(item)}
                  >
                    Delete from Cart
                  </button>
                </div>
                <div></div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="col-1">
        <div className="card card-body">
          <ul>
            <li>
              <h2>
                Subtotal ({cartItems.reduce((a, c) => a + Number(c.qty), 0)}{" "}
                items) : ${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
              </h2>
            </li>
            <li>
              <button
                type="button"
                onClick={checkoutHandler}
                className="primary block"
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
