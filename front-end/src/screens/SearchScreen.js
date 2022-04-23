import React, { useEffect } from "react";
import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Product from "../components/Product";
import { listProducts } from "../features/products/productsListSlice";
import { listProductsCategories } from "../features/products/productsCategoryListSlice";
import { listProductsBrand } from "../features/products/productsBrandListSlice";

const Conatainer = styled.div`
  display: grid;
  grid-template-columns: 13vw auto;
  grid-template-areas: " sd main";
`;
const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SideBar = styled.div`
  grid-area: sd;
  display: flex;
  justify-content: center;
`;
const Main = styled.div`
  grid-area: main;
`;
const SideWrapper = styled.div`
  margin-top: 20px;
`;

const SearchScreen = () => {
  const { category = "all", brand = "all" } = useParams();
  const productsList = useSelector((state) => state.productsList);
  const { isLoading, error, products } = productsList;
  const productsCategoryList = useSelector((state) => state.productsCategoryList);
  const {
    isLoading: loadingCategories,
    error: errorCategories,
    categories,
  } = productsCategoryList;
  const dispatch = useDispatch();
  const productsBrandList = useSelector((state) => state.productsBrandList);
  const { 
    isLoading: loadingBrands,
    error: errorBrands,
    brands
   } = productsBrandList

  useEffect(() => {
    dispatch(
      listProducts({
        category: category !== "all" ? category : "",
        brand: brand !== "all" ? brand : "",
      })
    );
    dispatch(listProductsCategories());
    dispatch(listProductsBrand());
  }, [brand, category, dispatch]);

  return (
    <Conatainer>
      <SideBar>
        <SideWrapper>
          <h3>Categories</h3>
          <ul>
            {categories?.map((category) => (
              <li key={category}>
                <Link to={`/search/category/${category}`}>{category}</Link>
              </li>
            ))}

            
          </ul>
          <h3>Brands</h3>
          <ul>
            {brands?.map((brand) => (
              <li key={brand}>
                <Link to={`/search/brand/${brand}`}>{brand}</Link>
              </li>
            ))}
            
          </ul>
        </SideWrapper>
      </SideBar>
      <Main>
        <div>
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
        <div className="col-3">
          {isLoading ? (
            <LoadingWrapper>
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
            </LoadingWrapper>
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
      </Main>
    </Conatainer>
  );
};

export default SearchScreen;
