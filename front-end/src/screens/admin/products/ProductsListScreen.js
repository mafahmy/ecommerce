import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllProductsQuery } from "../../../features/products/productsApi";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useNavigate } from "react-router-dom";
import {
  createProduct,
  resetCreateProduct,
} from "../../../features/admin/productCreateSlice";
import {
  deleteProduct,
  resetDeleteProduct,
} from "../../../features/admin/productDeleteSlice";
import Container from "@mui/material/Container";

export default function ProductsListScreen(props) {
  const navigate = useNavigate();
  const { data, error, isLoading, isFetching, isSuccess } =
    useGetAllProductsQuery([]);
  const productCreate = useSelector((state) => state.productCreate);
  const {
    isLoading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    isLoading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;
  const dispatch = useDispatch();

  useEffect(() => {
    if (successCreate) {
      dispatch(resetCreateProduct());
      navigate(`/product/${createdProduct._id}/edit`);
    }
    if (successDelete) {
      dispatch(resetDeleteProduct());
    }
  }, [createdProduct, dispatch, navigate, successCreate, successDelete]);

  const deleteHandler = (product) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteProduct(product._id));
    }
  };

  const createHandler = () => {
    dispatch(createProduct());
  };
  return (
    <Container maxWidth="lg" disableGutters>
    <div>
      
      <div className="row">
        <h1>Products</h1>
        <button type="button" className="primary" onClick={createHandler}>
          Create Product
        </button>
        <button type="button" className="primary" onClick={createHandler}>
          Create Category
        </button>
        <button type="button" className="primary" onClick={createHandler}>
          Create Brand
        </button>
      </div>
      
      {loadingDelete && (
        <div className="row center">
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
        </div>
      )}
      
      {errorDelete && (
        <div className="row center">
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {errorDelete}
        </Alert>
        </div>
      )}
      {loadingCreate && (
        <div className="row center">
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
        </div>
      )}
      {errorCreate && (
         <div className="row center">
         <Alert severity="error">
           <AlertTitle>Error</AlertTitle>
           {errorCreate}
         </Alert>
         </div>
      )}
      {isLoading ? (
       <div className="row center">
       <Box sx={{ display: "flex" }}>
         <CircularProgress />
       </Box>
       </div>
      ) : error ? (
        <div className="row center">
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
        </div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {data.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() => navigate(`/product/${product._id}/edit`)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(product)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </Container>
  );
}
