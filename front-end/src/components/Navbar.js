import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/users/userLogSlice";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const Container = styled.div`
  height: 50px;
  background-color: #203040;
`;
const Wrapper = styled.div`
  // padding: 10px 20px;

  height: 50px;
  display: flex;
  //flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
`;

// const MenuItem = styled.a`
//   color: #ffffff;
//   padding: 1rem;
//   text-decoration: none;
// `;

const Navbar = () => {
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
    <Container>
      <Wrapper>
        <div className="logo">
          <Link to="/">STORE</Link>
        </div>

        <div className="aside">
          <div>
            <Link to="/cart/:id">
              Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
          </div>

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
        </div>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
