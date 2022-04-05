import React from "react";
import styled from "styled-components";

const Container = styled.div`
 
  height: 50px;
  background-color: #203040;
  
`;
const Wrapper = styled.div`
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
  return (
    <Container>
      <Wrapper>
        <div className="logo">
          <MenuItem href="/">STORE</MenuItem>
        </div>

        <div>
          <MenuItem>Cart</MenuItem>
          <MenuItem>Sign In</MenuItem>
        </div>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
