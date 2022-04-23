import React from "react";
import styled from "styled-components";
import Ratings from "./Ratings";
import { Link } from "react-router-dom";

const Image = styled.img`
  max-width: 20rem;
  width: 100%;
`;
const Price = styled.div`
  font-size: 2rem;
`;

const Product = (props) => {
  const { product } = props;
  return (
    <div className="card">
      <Link to={`/product/${product._id}`}>
        <Image src={product.image} alt={product.name} />
      </Link>
      <div className="card-body">
        <Link to={`/product/${product._id}`}>{product.name}</Link>
        <Ratings
          rating={product.rating}
          numReviews={product.numReviews}
        ></Ratings>
        <Price>{product.price}</Price>
      </div>
    </div>
  );
};
export default Product;
