import React, { useEffect, useState } from "react";
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
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from '@mui/icons-material/Close';

const Conatainer = styled.div`
  display: grid;
  //grid-template-columns: 13vw auto;
  //grid-template-areas: " sd main";
`;
const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const SideBar = styled.div`
 // grid-area: sd;
  display: flex;
  
  justify-content: space-evenly;
  padding: 15px;
  background-color: #f8f8f8;
  border-radius: 15px;
  margin-bottom: 100px;
`;
const Main = styled.div`
 // grid-area: main;
`;
const SideWrapper = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`;



const SearchScreen = () => {
  const [active, setActive] = useState(false)
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
  const handleSearch = () => {
    setActive(!active);
  }


  return (
    <Conatainer>
     <div className="search-wrapper"onClick={handleSearch} > 
      <SearchIcon   fontSize="large"  />
      Search more 
      </div> 

      {active && (
      <SideBar onClick={handleSearch}>
        <SideWrapper>
          <CloseIcon sx={{  }}/>
          <h2>Categories</h2>
          <ul>
            {categories?.map((category) => (
              <li key={category}>
                <Link to={`/search/category/${category}`}><h4>{category}</h4></Link>
              </li>
            ))}

            
          </ul>
          </SideWrapper>
          <SideWrapper>
          <h2>Brands</h2>
          <ul>
            {brands?.map((brand) => (
              <li key={brand}>
                <Link to={`/search/brand/${brand}`}><h4>{brand}</h4></Link>
              </li>
            ))}
            
          </ul>
          </SideWrapper>
        
      </SideBar>
      )}
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
