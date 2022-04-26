import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listOrders } from "../../../features/admin/ordersListSlice";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useNavigate } from "react-router-dom";
import {
  deleteOrder,
  resetDeleteOrder,
} from "../../../features/admin/orderDeleteSlice";
import Container from "@mui/material/Container";

const OrdersListScreen = () => {
  const ordersList = useSelector((state) => state.ordersList);
  const { isLoading, error, orders } = ordersList;

  const orderDelete = useSelector((state) => state.orderDelete);
  const {
    isLoading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = orderDelete;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(resetDeleteOrder());
    dispatch(listOrders());
  }, [dispatch, successDelete]);

  const deleteHandler = (order) => {
    if (window.confirm("Are You Sure")) {
      dispatch(deleteOrder(order._id));
    }
  };

  return (
    <Container maxWidth="lg" disableGutters>
      <div>
        <h1>Orders</h1>
        <div className="row center">
        {loadingDelete && (
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        )}
        </div>
        <div className="row center">
        {errorDelete && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {errorDelete}
          </Alert>
        )}
        </div>

        {isLoading ? (
          <div className="row center">
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
          </div>
        ) : error ? (
          <div className="row center">
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>USER</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user.name}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice.toFixed(2)}</td>
                  <td>{order.isPaid ? "Paid": "No"}</td>
                  <td>
                    {order.isDelivered
                      ? order.deliveredAt.substring(0, 10)
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
                    <button
                      type="button"
                      className="small"
                      onClick={() => deleteHandler(order)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Container>
  );
};

export default OrdersListScreen;
