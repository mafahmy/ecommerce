import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Ratings from "../components/Ratings";
//import data from "../data";
import styled from "styled-components";
import { useGetProductQuery } from "../features/products/productsApi";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice3";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Rating from "@mui/material/Rating";
import {
  resetReview,
  reviewProduct,
} from "../features/products/productReviewSlice";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { HomeOutlined } from "@material-ui/icons";
import { detailsProduct } from "../features/admin/productDetailsSlice";

const Image = styled.img
  `margin-top: 2rem;
  max-width: 50%;
  max-height: 500px;`


const ProductScreen = (props) => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const productDetails = useSelector((state) => state.productDetails);
  // const { data, isLoading, error } = productDetails;


  const { data, error, isLoading, isFetching, isSuccess } =
    useGetProductQuery(productId);

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");

  const userSignin = useSelector((state) => state.log);
  const { userInfo } = userSignin;
  const productReview = useSelector((state) => state.productReview);
  const {
    isLoading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = productReview;
  // dispatch(detailsProduct(productId));
  //const product = data.products.filter((x) => x._id ===id);
  // if (!data) {
  //   return <div>Product not found</div>;
  // }
  const payload = {
    name: data?.name,
    image: data?.image,
    price: data?.price,
    countInstock: data?.countInstock,
    product: data?._id,
    qty,
  };

  useEffect(() => {

    

    if (successReviewCreate) {
      window.alert("Review Submitted Successfully");
      setRating("");
      setComment("");
      dispatch(resetReview());
      
      navigate("/");
    }
    dispatch(detailsProduct(productId));
     

  }, [dispatch, navigate, productId, successReviewCreate]);

 

  const addToCartHandler = (payload) => {
    navigate(`/cart/${productId}?qty=${qty}`);
    dispatch(addToCart(payload));
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(
        reviewProduct({ productId, rating, comment, name: userInfo.name })
      );
    }
  };
  console.log(rating);
  console.log("mahmoud")
  // if (!data) {
  //   return <h2>....Loading</h2>
  // }
  return (
    <Container maxWidth="lg" disableGutters>

      <div>
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
              <h3>{error} </h3>
            </Alert>
          </div>
        ) : (
          <div>
            {console.log('mahmoud')}
            {console.log(payload)}
            <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
              <Link to="/">
                <HomeOutlined />
              </Link>
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <div className="row top">
              <div className="col-2">
                <Image src={data.image} alt={data.name}></Image>
                {console.log(data.image)}
              </div>
              <div className="col-1">
                <ul>
                  <li>
                    <h1>{data.name}</h1>
                  </li>
                  <li>
                    <Ratings size="large" rating={data.rating} />
                  </li>
                  <li>Price : LE{data.price}</li>
                  <li>
                    Description:
                    <p>{data.description}</p>
                  </li>
                </ul>
              </div>
              <div className="col-1">
                <div className="card card-body">
                  <ul>
                    <li>
                      <div className="row">
                        <div>Price</div>
                        <div className="price">{data.price}</div>
                      </div>
                    </li>
                    <li>
                      <div className="row">
                        <div>Status</div>
                        <div>
                          {data.countInstock > 0 ? (
                            <span className="success">In Stock</span>
                          ) : (
                            <span className="danger">Out of Stock</span>
                          )}
                        </div>
                      </div>
                    </li>
                    {data.countInstock > 0 && (
                      <>
                        <li>
                          <div className="row">
                            <div>Qty</div>
                            <div>
                              <select
                                value={qty}
                                onChange={(e) => setQty(e.target.value)}
                              >
                                {[...Array(data.countInstock).keys()].map(
                                  (x) => (
                                    <option key={x + 1} value={x + 1}>
                                      {x + 1}
                                    </option>
                                  )
                                )}
                              </select>
                            </div>
                          </div>
                        </li>
                        <li>
                          <button
                            className="primary block"
                            onClick={() => addToCartHandler(payload)}
                          >
                            Add to Cart
                          </button>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <h2 id="reviews">Reviews</h2>
              {data.reviews.length === 0 && (
                <Alert severity="info">
                  <AlertTitle>Information</AlertTitle>
                  <h3>No Reviews </h3>
                </Alert>
              )}
              <ul>
                {data.reviews.map((review) => (
                  <li key={review._id}>
                    <strong>{review.name}</strong>
                    {/* <Rating rating={review.rating} caption=" "></Rating> */}
                    <Ratings size="large" rating={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </li>
                ))}
                <li>
                  {userInfo ? (
                    <form className="form" onSubmit={submitHandler}>
                      <div>
                        <h2>Write a customer review</h2>
                      </div>
                      <div>
                        <label htmlFor="rating">Rating</label>
                        <Rating
                          name="simple-controlled"
                          value={rating}
                          onChange={(event, newValue) => {
                            setRating(event.target.value);
                          }}
                        />
                      </div>
                      <div>
                        <label htmlFor="comment">Comment</label>
                        <textarea
                          id="comment"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                      </div>
                      <div>
                        <label />
                        <button className="primary" type="submit">
                          Submit
                        </button>
                      </div>
                      <div>
                        {loadingReviewCreate && (
                          <Box sx={{ display: "flex" }}>
                            <CircularProgress />
                          </Box>
                        )}
                        {errorReviewCreate && (
                          <Alert severity="error">
                            <AlertTitle>Error</AlertTitle>
                            <h3>{errorReviewCreate} </h3>
                          </Alert>
                        )}
                      </div>
                    </form>
                  ) : (
                    <Alert severity="info">
                      <AlertTitle>
                        Please <Link to="/signin">Sign In</Link> to write a
                        review
                      </AlertTitle>
                    </Alert>
                  )}
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default ProductScreen;
