import Typography from "@mui/material/Typography";
import React from "react";
import styled from "styled-components";

import Container from "@mui/material/Container";
import Brand from "./Brand";
const brands = [
  {
    id: 1,
    img: "images/appleIphone13.jpg",
    title: "Apple",
    brand: "Apple",
  },
  {
    id: 2,
    img: "images/lapTopDellI7.jpg",
    title: "Dell",
    brand: "Dell",
  },
  {
    id: 3,
    img: "images/samsungtv.jpg",
    title: "Samsung",
    brand: "Samsung",
  },
  {
    id: 4,
    img: "images/canonEOSCam.jpg",
    title: "Canon",
    brand: "Canon",
  },
];

const Container1 = styled.div`
  margin: 4rem 0 2rem 0;
  display: flex;
  padding: 50px;
  justify-content: center;
  flex-wrap: wrap;
`;
const Brands = () => {
  return (
    <>
      <Container maxWidth="lg" disableGutters>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: 700,
            marginTop: "4rem",
            textAlign: "center",
          }}
        >
          SHOP BY BRAND
        </Typography>
        <Container1>
          {brands.map((item) => (
            <Brand key={item.id} item={item} />
          ))}
        </Container1>
      </Container>
    </>
  );
};

export default Brands;
