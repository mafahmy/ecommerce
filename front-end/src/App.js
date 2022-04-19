import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./screens/HomePage";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingAddressScreen from "./screens/ShippingAdressScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import { useSelector } from "react-redux";
import AdminScreen from "./screens/admin/AdminScreen";
import UsersScreen from "./screens/admin/users/UsersScreen";
//import SideBar from "./components/admin/sideBar/SideBar";
import ProfileScreen from "./screens/ProfileScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import AdminRoute from "./components/admin/AdminRoute";
import ProductsListScreen from "./screens/admin/products/ProductsListScreen";
import ProductEditScreen from "./screens/admin/products/productEditScreen";
import OrdersListScreen from "./screens/admin/orders/OrdersListScreen";

function App() {
  const log = useSelector((state) => state.log);
  const { userInfo } = log;
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="App-header">
          <Navbar />
        </header>
        <main>
          <Routes>
            <Route path="/cart/:id" element={<CartScreen />} />
            {/* <Route path="/cart/" element={<CartScreen />} /> */}
            <Route path="/" element={<HomePage />} exact />
            <Route path="/product/:id" exact element={<ProductScreen />} />
            <Route path="/signin" element={<SigninScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/shipping" element={<ShippingAddressScreen />} />
            <Route path="/payment" element={<PaymentMethodScreen />} />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route path="/order/:id" element={<OrderScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/ordershistory" element={<OrderHistoryScreen />} />

            <Route
              path="/productlist"
              element={
                <AdminRoute>
                  <ProductsListScreen />{" "}
                </AdminRoute>
              }
            />
            <Route
              path="/users"
              element={
                <AdminRoute>
                  {" "}
                  <UsersScreen />{" "}
                </AdminRoute>
              }
            />
            <Route
              path="/users"
              element={
                <AdminRoute>
                  {" "}
                  <OrdersListScreen />{" "}
                </AdminRoute>
              }
            />
            <Route
              path="/product/:id/edit"
              element={
                <AdminRoute>
                  {" "}
                  <ProductEditScreen />{" "}
                </AdminRoute>
              }
              exact
            />

            <Route path="/admin" element={<AdminScreen />} />
          </Routes>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
