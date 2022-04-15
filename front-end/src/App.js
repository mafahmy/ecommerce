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

function App() {
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
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/signin" element={<SigninScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/shipping" element={<ShippingAddressScreen />} />
            <Route path="/payment" element={<PaymentMethodScreen/>} />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
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
