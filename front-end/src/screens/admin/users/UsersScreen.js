import React, { useEffect } from 'react';
//import "./users.css";
import Alert from "@mui/material/Alert";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { listUsers } from '../../../features/admin/usersListSlice';
import { Box, CircularProgress } from '@mui/material';

const UsersScreen = () => {


  const usersList = useSelector((state) => state.users);
  const { isLoading, error, users } = usersList;
  // const [data, setData] = useState(users);


 

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(listUsers());
  },[dispatch]);
  





  return (
    
    <div>
       <h1>Users</h1>
      {isLoading ? (
            <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
      ) : error ? (
        <Alert variant="filled" color='red' severity="error">{error}</Alert>
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
                <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
   
    


export default UsersScreen