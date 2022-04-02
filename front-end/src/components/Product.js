import React from "react";
import styled from "styled-components";



const Product = (props) => {
  const { product } = props;
  return (
    <div className="card">
    
      <img src={product.image} alt={product.name} />
     <div className="card-body">{product.name}</div> 
    </div>
    
  );
};
export default Product;
