import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser } from "../features/users/userDetailsSlice";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import {
  resetUpdateProfile,
  updateUserProfile,
} from "../features/users/userUpdateProfileSlice";
import AlertTitle from "@mui/material/AlertTitle";
import Container from "@mui/material/Container";
import { Navigate } from "react-router-dom";

export default function ProfileScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const userSignin = useSelector((state) => state.log);
  const { isLoggedIn, userInfo } = userSignin;
  const userDetails = useSelector((state) => state.userDetails);
  const { isLoading, error, user } = userDetails;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    isLoading: loadingUpdate,
  } = userUpdateProfile;

  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      dispatch(resetUpdateProfile());
      dispatch(detailsUser(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setTimeout(() => {
        dispatch(resetUpdateProfile());
        
      }, 8000);
    }
  }, [dispatch, user, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password and confirm Password Are Not Matched");
    } else {
      dispatch(updateUserProfile({ userId: user._id, name, email, password }));
    }
  };
  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <div>
      <Container maxWidth="lg" disableGutters>
        <form className="form" onSubmit={submitHandler}>
          <div>
            <h1>User Profile</h1>
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
              {loadingUpdate && (
                <Box sx={{ display: "flex" }}>
                  <CircularProgress />
                </Box>
              )}
              {errorUpdate && (
                <div className="row center">
                  <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                  </Alert>
                </div>
              )}
              {successUpdate && (
                <div className="row center">
                  <Alert>
                    <AlertTitle>Profile Updated successfully</AlertTitle>
                    {/* {successUpdate} */}
                  </Alert>
                </div>
              )}

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
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </div>
              <div>
                <label htmlFor="confirmPassword">confirm Password</label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Enter confirm password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></input>
              </div>
              <div>
                <label />
                <button className="primary" type="submit">
                  Update
                </button>
              </div>
            </>
          )}
        </form>
      </Container>
    </div>
  );
}
