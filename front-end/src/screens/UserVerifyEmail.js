import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { checkToken } from "../features/users/userCheckTokenSlice";
import { Container } from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const UserVerifyEmail = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isLoading, success, isVerified, error} = useSelector((state) => state.userCheckToken);
  
  
  console.log(token)
  useEffect(() => {
    if (isVerified && success) {
      navigate("/signin?redirect=/placeorder");
    }
  }, [isVerified, navigate, success]);
  const handleSubmit = (e) => {
    
    dispatch(checkToken(token));
    
  };
  return isLoading ? (
    <div className="row center">
      <Box sx={{ display: "flex", alignItem: "center" }}>
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
    
     
    
    <div className="row center vertical">
     
      <Button onClick={handleSubmit} variant="contained">
        validate my email
      </Button>
    </div>
    
  );
};

export default UserVerifyEmail;
