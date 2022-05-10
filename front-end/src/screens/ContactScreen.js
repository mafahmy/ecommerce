import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useNavigate } from "react-router-dom";
import {
  resetSubmitTicket,
  submitTicket,
} from "../features/users/userSubmitTicketSlice";
import { Container } from "@mui/material";

const ContactScreen = () => {
  const [message, setMessage] = useState("");
  const signIn = useSelector((state) => state.log);
  const { isLoading, isLoggedIn, userInfo, error } = signIn;
  const userSubmitTicket = useSelector((state) => state.userSubmitTicket);
  const {
    isLoading: loadingTicket,
    error: errorTicket,
    success,
    ticket,
  } = userSubmitTicket;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        dispatch(resetSubmitTicket());
        setMessage("");
      }, 8000);
    }
  }, [dispatch, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(submitTicket(message));
    // navigate('/');
  };

  return (
    
    <div className="loginBack">
      {!isLoggedIn ? (
        <Alert severity="info">
          <AlertTitle>Please, Sign In first </AlertTitle>
        </Alert>
      ) : (
        <div>
          <div className="row center">
            {loadingTicket && (
              <Box
                sx={{
                  display: "flex",
                  alignItem: "center",
                  color: "secondary",
                }}
              >
                <CircularProgress />
              </Box>
            )}
            {errorTicket && (
              <Alert severity="error">
                <AlertTitle>{errorTicket} </AlertTitle>
              </Alert>
            )}
            {success && (
              <Alert severity="success">
                <AlertTitle>{ticket.message} </AlertTitle>
              </Alert>
            )}
          </div>
          <form className="form" onSubmit={submitHandler}>
            <div>
              <h1>Hello{` ${userInfo.name}, `}What can we do for You?</h1>
            </div>
            <div>
              <label htmlFor="comment" />
              <textarea
                rows="10"
                cols="30"
                id="comment"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your message"
              ></textarea>
            </div>
            <div>
              <label />
              <button className="primary" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
    
  );
  
};

export default ContactScreen;
