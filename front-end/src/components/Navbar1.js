import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import DescriptionIcon from "@mui/icons-material/Description";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import HistoryIcon from "@mui/icons-material/History";
import LogoutIcon from "@mui/icons-material/Logout";

//import IconButton from '@mui/material/IconButton';
//import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/users/userLogSlice";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MenuItemSign from "./MenuItemSign";
import UserMenu from "./UserMenu";
import AdminMenu from "./AdminMenu";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Grid, ListItemText } from "@mui/material";

// const StyledSearch = styled("div")(({ theme }) => ({
//   position: "relative",
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.primary.main, 0.15),
//   "&:hover": {
//     backgroundColor: alpha(theme.palette.primary.main, 0.25),
//   },
//   marginRight: theme.spacing(2),
//   marginLeft: 0,
//   width: "100%",
//   [theme.breakpoints.up("sm")]: {
//     marginLeft: theme.spacing(3),
//     width: "auto",
//   },
// }));

// const SearchIconWrapper = styled("div")(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: "100%",
//   position: "absolute",
//   pointerEvents: "none",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: "inherit",
//   "& .MuiInputBase-input": {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create("width"),
//     width: "100%",
//     [theme.breakpoints.up("md")]: {
//       width: "20ch",
//     },
//   },
// }));

//search as JSX
// const search = (
//   <StyledSearch>
//     <SearchIconWrapper>
//       <SearchIcon />
//     </SearchIconWrapper>
//     <StyledInputBase
//       placeholder="Suchen…"
//       inputProps={{ "aria-label": "search" }}
//     />
//   </StyledSearch>
// );

const MenuWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  height: "100%",
}));

export default function Navbar1() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.log);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();

  const signoutHandler = () => {
    dispatch(logout());
  };

  const [open, setState] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(open);
  };

  return (
    <>
      <AppBar position="static" color="primary">
        <Container maxWidth="lg" height="60px" disableGutters>
          <Toolbar
            sx={{
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              hight: "100%",
            }}
          >
            <Typography variant="h4" sx={{ flexGrow: 1, fontWeight: 500 }}>
              <Link to="/">Brand</Link>
            </Typography>

            <Box
              component="div"
              sx={{
                display: {
                  xs: "none",
                  sm: "block",
                },
              }}
            >
              <div>
                <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 500 }}>
                  <Link to="/cart/:id">
                    Cart
                    {cartItems.length > 0 && (
                      <span className="badge">{cartItems.length}</span>
                    )}
                  </Link>
                </Typography>
              </div>
            </Box>
            {!userInfo && (
              <Box
                component="div"
                sx={{
                  display: {
                    xs: "none",
                    sm: "block",
                  },
                }}
              >
                <div>
                  <Typography
                    variant="h6"
                    sx={{ flexGrow: 1, fontWeight: 500 }}
                  >
                    <Link to="/register">Register</Link>
                  </Typography>
                </div>
              </Box>
            )}
            <Box
              component="div"
              sx={{
                display: {
                  xs: "none",
                  sm: "block",
                },
              }}
            >
              <div>
                {userInfo ? (
                  <div className="dropdown">
                    <Link to="#">
                      <Stack direction="row">
                        <MenuWrapper>
                        <Typography
                          variant="h6"
                          sx={{
                            flexGrow: 1,
                            fontWeight: 500,
                            alignItems: "center",
                          }}
                        >
                          {userInfo.name}
                        </Typography>
                        <ArrowDropDownIcon color="white" />
                        </MenuWrapper>
                      </Stack>
                    </Link>
                    <ul className="dropdown-content">
                      <li>
                        <Link to="/profile">
                          <MenuWrapper>
                            <PersonOutlineOutlinedIcon />
                            User Profile
                          </MenuWrapper>
                        </Link>
                      </li>
                      <li>
                        <Link to="/ordershistory">
                          <MenuWrapper>
                            <HistoryIcon />
                            Order History
                          </MenuWrapper>
                        </Link>
                      </li>
                      <li>
                        <Link to="#signout" onClick={signoutHandler}>
                          <MenuWrapper>
                            <LogoutIcon />
                            Sign Out
                          </MenuWrapper>
                        </Link>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <Box
                    component="div"
                    sx={{
                      display: {
                        xs: "none",
                        sm: "block",
                      },
                    }}
                  >
                    <div>
                      <Typography
                        variant="h6"
                        sx={{ flexGrow: 1, fontWeight: 500 }}
                      >
                        <Link to="/signin">Sign In</Link>
                      </Typography>
                    </div>
                  </Box>
                )}

                {userInfo && userInfo.isAdmin && (
                  <div className="dropdown">
                    <Link to="#">
                      <Stack direction="row" alignItems="center" gap={1}>
                        <AdminPanelSettingsOutlinedIcon />

                        <Typography
                          variant="h6"
                          sx={{ flexGrow: 1, fontWeight: 500 }}
                        >
                          Admin
                        </Typography>
                        <ArrowDropDownIcon color="white" />
                      </Stack>
                    </Link>

                    <ul className="dropdown-content">
                      {/* <li>
                          <Link to="/dashboard">Dashboard</Link>
                        </li> */}
                      <li>
                        <Link to="/productlist">Products</Link>
                      </li>
                      <li>
                        <Link to="/orderlist">Orders</Link>
                      </li>
                      <li>
                        <Link to="/users">Users</Link>
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
            </Box>

            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer(true)}
              sx={{
                ml: 2,
                display: {
                  xs: "block",
                  sm: "none",
                },
              }}
            >
              <MenuIcon />
            </IconButton>

            <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
              <Box
                sx={{
                  p: 2,
                  height: 1,

                  backgroundColor: "white",
                }}
              >
                <IconButton onClick={toggleDrawer(false)} sx={{ mb: 2 }}>
                  <CloseIcon />
                </IconButton>

                <Divider sx={{ mb: 2 }} />

                <Box sx={{ mb: 2 }}>
                  {/* <ListItemButton>

                  <MenuItemSign  />
                  <ListItemIcon>
                    <ImageIcon sx={{ color: "primary.main" }} />
                  </ListItemIcon>
                  <ListItemText primary="Pictures" />
                </ListItemButton> */}

                  <ListItemButton>
                    <ListItemIcon>
                      <DescriptionIcon sx={{ color: "primary.main" }} />
                    </ListItemIcon>
                    {/* <ListItemText primary="CART" /> */}
                    <div>
                      <Link to="/cart/:id">
                        Cart
                        {cartItems.length > 0 && (
                          <span className="badge">{cartItems.length}</span>
                        )}
                      </Link>
                    </div>
                  </ListItemButton>

                  <ListItemButton>
                    <ListItemIcon>
                      <PersonOutlineOutlinedIcon
                        sx={{ color: "primary.main" }}
                      />
                    </ListItemIcon>
                    <UserMenu />
                    {/* <ListItemText primary="Other" /> */}
                  </ListItemButton>

                  {userInfo && userInfo.isAdmin && (
                    <ListItemButton>
                      <ListItemIcon>
                        <AdminPanelSettingsOutlinedIcon
                          sx={{ color: "primary.main" }}
                        />
                      </ListItemIcon>
                      <AdminMenu />
                      {/* <ListItemText primary="CART" /> */}
                    </ListItemButton>
                  )}
                </Box>

                {/* {search} */}

                {!userInfo && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      position: "absolute",
                      bottom: "0",
                      left: "50%",
                      transform: "translate(-50%, 0)",
                    }}
                  >
                    <Button variant="outlined" sx={{ m: 1, width: 0.5 }}>
                      <Link to="/register">Register</Link>
                    </Button>
                    <Button variant="outlined" sx={{ m: 1, width: 0.5 }}>
                      <Link to="/signin">Login</Link>
                    </Button>
                  </Box>
                )}
              </Box>
            </Drawer>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
