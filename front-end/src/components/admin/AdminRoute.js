import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect, Navigate, Routes } from 'react-router-dom';


const AdminRoute = ({ component: Component, ...rest }) => {
    const log = useSelector((state) => state.log);
    const { userInfo } = log;
  return (
    <Routes>
      <Route
        {...rest}
        render={(props) => userInfo && userInfo.isAdmin ? (
            <Component {...props}></Component>
        ): (
            <Navigate to="/signin" />
        )} />
        </Routes>
    
  )
}

export default AdminRoute;