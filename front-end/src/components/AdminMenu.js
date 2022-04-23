import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/users/userLogSlice";
import { Link } from "react-router-dom";

export default function AdminMenu() {
  const userSignin = useSelector((state) => state.log);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const signoutHandler = () => {
    dispatch(logout());
  };

  return (
    <>
      {userInfo && userInfo.isAdmin && (
        <div>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            Admin
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>
              <Link to="/dashboard">DashBoard</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to="/productlist">Products</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to="/orderlist">Orders</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to="/users">Users</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to="#signout" onClick={signoutHandler}>
                Logout
              </Link>
            </MenuItem>
          </Menu>
        </div>
      )}
    </>
  );
}
