import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { Navigate, useNavigate } from "react-router-dom";
import { listUserOrders } from "../features/orders/userOrdersSlice";
import AlertTitle from "@mui/material/AlertTitle";

export default function OrderHistoryScreen(props) {
  const navigate = useNavigate();
  const userOrders = useSelector((state) => state.userOrders);
  const { isLoading, error, orders } = userOrders;
  const userSignin = useSelector((state) => state.log);
  const { isLoggedIn } = userSignin;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listUserOrders());
  }, [dispatch]);

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }
  if (isLoading) {
    return <div>Loading</div>;
  }
  return (
    <div>
      <h1>Order History</h1>
      {isLoading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map((order) => (
                <tr key={order._id}>
                  {console.log(order.createdAt)}
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(1, 10)}</td>
                  <td>{order.totalPrice.toFixed(2)}</td>
                  <td>{order.isPaid ? "Paid" : "No"}</td>
                  {console.log(order.isPaidAt)}
                  <td>
                    {order.isDelivered
                      ? order.deliveredAt.substring(1, 10)
                      : "No"}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="small"
                      onClick={() => {
                        navigate(`/order/${order._id}`);
                      }}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
