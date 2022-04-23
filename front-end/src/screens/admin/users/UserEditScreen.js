import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  resetUpdateUser,
  updateUser,
} from "../../../features/admin/userUpdateSlice";
import { detailsUser } from "../../../features/users/userDetailsSlice";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Radio from "@mui/material/Radio";

const UserEditScreen = () => {
  const { id: userId } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const userDetails = useSelector((state) => state.userDetails);
  const { isLoading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    isLoading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (successUpdate) {
      dispatch(resetUpdateUser());
      navigate("/users");
    }
    if (!user) {
      dispatch(detailsUser(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setStatus(user.status);
      setIsAdmin(user.isAdmin);
    }
  }, [dispatch, navigate, successUpdate, user, userId]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateUser({
        _id: userId,
        name,
        email,
        password,
        status,
        isAdmin,
      })
    );
  };

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Edit User {name}</h1>
          {loadingUpdate && (
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          )}
          {errorUpdate && (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {errorUpdate}
            </Alert>
          )}
        </div>
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
          <>
            <div>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="confirmPassword">Email</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Enter Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></input>
            </div>
            <div>
              {console.log(status)}
              <label htmlFor="status"></label>
              ACTIVE
              <Radio
                checked={status === "Active"}
                onChange={(e) => setStatus(e.target.value)}
                value="active"
                name="radio-buttons"
                // inputProps={{ "aria-label": "A" }}
              /> 
              Inactive
              <Radio
                checked={status === "inActive"}
                onChange={(e) => setStatus(e.target.value)}
                value="inActive"
                name="radio-buttons"
                // inputProps={{ "aria-label": "B" }}
              />
              suspended
              <Radio
                checked={status === "suspended"}
                onChange={(e) => setStatus(e.target.value)}
                value="suspended"
                name="radio-buttons"
                // inputProps={{ "aria-label": "B" }}
              />

              {/* <input
                
                type="radio"
                // checked={setStatus(e.target.checked)}
                 value= {status}
                onChange={(e) => setStatus(e.target.value)}
                

              />Active
              <input
                
                type="radio"
                // checked={setStatus('')}
                 value={status}
                onChange={(e) => setStatus(e.target.value)}
              />In Active
              <input
                
                type="radio"
                // checked={setStatus(e.target.checked)}
                value={status} 
                onChange={(e) => setStatus(e.target.value)}

              />suspended */}
            </div>
            <div>
              <label htmlFor="isAdmin">Is Admin</label>
              <input
                id="isAdmin"
                type="checkbox"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
            </div>
            <div>
              <button type="submit" className="primary">
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default UserEditScreen;
