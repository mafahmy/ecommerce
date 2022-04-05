import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Product from "../components/Product";
import Categories from "../components/Categories";
import Slider1 from "../components/Slider1";


const Container = styled.div`
  height: max-content;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/api/products");
        setProducts(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    console.log(products);
  }, []);
  console.log(products);

  return (
    <div>
    <Slider1 />
    <Categories />
      <Container>
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </Container>
    </div>
  );
};
export default HomePage;
