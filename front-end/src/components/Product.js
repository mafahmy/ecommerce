import React from "react";
import styled from "styled-components";
import Ratings from "./Ratings";

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
      <a href={`/product/${product._id}`}>
        <Image src={product.image} alt={product.name} />
      </a>
      <div className="card-body">
        <a href={`/product/${product._id}`}>{product.name}</a>
        <Ratings
          rating={product.rating}
          numReviews={product.numReviews}
        ></Ratings>
        <Price>
          {product.price}
        </Price>
      </div>
    </div>
  );
};
export default Product;
