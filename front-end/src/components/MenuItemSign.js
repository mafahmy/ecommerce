import React from 'react'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/users/userLogSlice";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const MenuItemSign = () => {
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const userSignin = useSelector((state) => state.log);
    const { userInfo } = userSignin;
    const dispatch = useDispatch();
    console.log(userInfo);
  
    const signoutHandler = () => {
      dispatch(logout());
    };
  return (
    <div>
              {userInfo ? (
                <div className="dropdown">
                  <Link to="#">
                    {userInfo.name}
                    <ArrowDropDownIcon color="white" />
                  </Link>
                  <ul className="dropdown-content">
                    <li>
                      <Link to="/profile">User Profile</Link>
                    </li>
                    <li>
                      <Link to="/ordershistory">Order History</Link>
                    </li>
                    <li>
                      <Link to="#signout" onClick={signoutHandler}>
                        Sign Out
                      </Link>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link to="/signin">Sign In</Link>
              )}
              {userInfo && userInfo.isAdmin && (
                <div className="dropdown">
                  <Link to="#Admin">
                    Admin
                    <ArrowDropDownIcon color="white" />
                  </Link>
                  <ul className="dropdown-content">
                    <li>
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                      <Link to="/productlist">Products</Link>
                    </li>
                    <li>
                      <Link to="/orderlist">Orders</Link>
                    </li>
                    <li>
                      <Link to="/userslist">Users</Link>
                    </li>
                    <li>
                      <Link to="#signout" onClick={signoutHandler}>
                        Sign Out
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
  )
}

export default MenuItemSign