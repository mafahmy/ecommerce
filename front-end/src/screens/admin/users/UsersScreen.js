import React, { useEffect } from "react";

import Alert from "@mui/material/Alert";

import { useDispatch, useSelector } from "react-redux";
import { listUsers } from "../../../features/admin/usersListSlice";
import { AlertTitle, Box, CircularProgress } from "@mui/material";
import { deleteUser } from "../../../features/admin/userDeleteSlice";
import { useNavigate } from "react-router-dom";
import { resetUpdateUser } from "../../../features/admin/userUpdateSlice";

const UsersScreen = () => {
  const usersList = useSelector((state) => state.users);
  const { isLoading, error, users } = usersList;
  // const [data, setData] = useState(users);

  const userDelete = useSelector((state) => state.userDelete);
  const {
    isLoading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(listUsers());
    dispatch(resetUpdateUser());
  }, [dispatch, successDelete]);

  const deleteHandler = (user) => {
    if (window.confirm("Are You Sure")) {
      dispatch(deleteUser(user._id));
    }
  };

  return (
    <div>
      <h1>Users</h1>
      {loadingDelete && (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      )}
      {errorDelete && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {errorDelete}
        </Alert>
      )}
      {successDelete && (
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          {successDelete}
        </Alert>
      )}
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
              <th>NAME</th>
              <th>EMAIL</th>
              <th>IS ACTIVE</th>
              <th>IS ADMIN</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.status}</td>
                <td>{user.isAdmin ? "YES" : "NO"}</td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() => navigate(`/user/${user._id}/edit`)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(user)}
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
  );
};

export default UsersScreen;
