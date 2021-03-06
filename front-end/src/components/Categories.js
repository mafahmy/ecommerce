import Typography from "@mui/material/Typography";
import React from "react";
import styled from "styled-components";
import CategoryItem from "./CategoryItem";
import Container from "@mui/material/Container";
const categories = [
  {
    id: 1,
    img: "images/appleIphone13.jpg",
    title: "Mobiles",
    category: "MOBILE",
  },
  {
    id: 2,
    img: "images/lapTopDellI7.jpg",
    title: "LapTops",
    category: "LAPTOP",
  },
  {
    id: 3,
    img: "images/samsungtv.jpg",
    title: "TV",
    category: "TV",
  },
  {
    id: 4,
    img: "images/canonEOSCam.jpg",
    title: "Cameras",
    category: "CAMERAS",
  },
];

const Container1 = styled.div`
  margin: 4rem 0 2rem 0;
  display: flex;
  padding: 50px;
  justify-content: center;
  flex-wrap: wrap;
`;
const Categories = () => {
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
          SHOP BY CATEGORY
        </Typography>
        <Container1>
          {categories.map((item) => (
            <CategoryItem key={item.id} item={item} />
          ))}
        </Container1>
      </Container>
    </>
  );
};

export default Categories;
