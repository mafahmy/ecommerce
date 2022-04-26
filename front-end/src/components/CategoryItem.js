import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from '@mui/material/Button';

const Container = styled.div`
  flex: 1;
  margin: 6px;
  padding: 20px;
  height: 50vh;
  max-width: 250px;
  min-width: 200px;
  border: 0.5px solid gray;
  box-shadow: 2 black;
`;
const Image = styled.img`
  width: 100%;
  height: 50%;
  object-fit: contain;
`;
const Info = styled.div`
  flex: 1;
  width: 100%;
  height: inherit; ;
`;

const Title = styled.p`
  text-align: center;
`;

const CategoryItem = ({ item }) => {
  return (
    <>
      <Container key={item._id}>
        <Link to={`/search/category/${item.category}`}>
          <Image src={item.img} />
          <Info>
            <Title>{item.title}</Title>
            {/* <button className="primary block">SHOP NOW</button> */}
            <Button variant="contained" fullWidth>SHOP NOW</Button>
          </Info>
        </Link>
      </Container>
    </>
  );
};

export default CategoryItem;
