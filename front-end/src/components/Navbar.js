import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Container = styled.div`
 
  height: 50px;
  background-color: #203040;
  
`;
const Wrapper = styled.div `
  // padding: 10px 20px;
 
  height: 50px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
`;

const MenuItem = styled.a`
  color: #ffffff;
  padding: 1rem;
  text-decoration: none;
`;

const Navbar = () => {

  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;
  console.log(cartItems)
  return (
    <Container>
      <Wrapper>
        <div className="logo">
          <Link to="/">STORE</Link>
        </div>

        <div>
          <Link to="/cart/:id">Cart
          {cartItems.length > 0 && (
            <span className="badge">{cartItems.length}</span>
          )}
          </Link>
          <Link to="/signin">Sign In</Link>
        </div>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
