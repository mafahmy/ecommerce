import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
//import { detailsProduct } from '../actions/productActions';
import { useGetProductQuery } from "../../../features/products/productsApi";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const ProductEditScreen = (props) => {
  const { id } = useParams();

  


    

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [countInstock, setCountInstock] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');

  const { data, isError, isLoading, isFetching, isSuccess } =
  useGetProductQuery(id);

  

  //   const productDetails = useSelector((state) => state.productDetails);
  //   const { loading, error, product } = productDetails;
  // useEffect(() => {
  //   console.log(id);

  //   console.log(data)

  // if (isSuccess) {
  //   setName(data.name);
  //   setPrice(data.price);
  //   setImage(data.image);
  //   setCategory(data.category);
  //   setCountInstock(data.countInstock);
  //   setBrand(data.brand);
  //   setDescription(data.description);
  
  // }
  const submitHandler = (e) => {
    e.preventDefault();
    // TODO: dispatch update product
  };

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Edit Product {id}</h1>
        </div>
        {isLoading ? (
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        ) : isError ? (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {isError}
          </Alert>
        ) : (
          <>
            <div>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter name"
                value={data.name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="price">Price</label>
              <input
                id="price"
                type="text"
                placeholder="Enter price"
                value={data.price}
                onChange={(e) => setPrice(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="image">Image</label>
              <input
                id="image"
                type="text"
                placeholder="Enter image"
                value={data.image}
                onChange={(e) => setImage(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="category">Category</label>
              <input
                id="category"
                type="text"
                placeholder="Enter category"
                value={data.category}
                onChange={(e) => setCategory(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="brand">Brand</label>
              <input
                id="brand"
                type="text"
                placeholder="Enter brand"
                value={data.brand}
                onChange={(e) => setBrand(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="countInStock">Count In Stock</label>
              <input
                id="countInStock"
                type="text"
                placeholder="Enter countInStock"
                value={data.countInstock}
                onChange={(e) => setCountInstock(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                rows="3"
                type="text"
                placeholder="Enter description"
                value={data.description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label></label>
              <button className="primary" type="submit">
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};
export default ProductEditScreen;
