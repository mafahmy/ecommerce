import React from 'react'
import styled from 'styled-components';
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Product from '../components/Product';



const SearchScreen = () => {

    const { name = 'all'} = useParams();
    const productsList = useSelector((state) => state.productsList);
    const { isLoading, error, products} = productsList;

  return (
    <div>
    <div className="row">
      {isLoading ? (
        <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
      ) : error ? (
        <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {error}
            </Alert>
      ) : (
        <div>{products.length} Results</div>
      )}
    </div>
    <div className="row top">
      <div className="col-1">
        <h3>Department</h3>
        <ul>
          <li>Categoey 1</li>
        </ul>
      </div>
      <div className="col-3">
        {isLoading ? (
          <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
        ) : error ? (
            <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        ) : (
          <>
            {products.length === 0 && (
              <Alert severity="warning">
              <AlertTitle>Warning</AlertTitle>
              No Products Found
            </Alert>
            )}
            <div className="row center">
              {products.map((product) => (
                <Product key={product._id} product={product}></Product>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  </div>
  )
}

export default SearchScreen