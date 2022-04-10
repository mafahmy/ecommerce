import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Ratings from "../components/Ratings";
//import data from "../data";
import styled from "styled-components";
import { useGetProductQuery } from "../features/products/productsApi";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice3";

const Image = styled.img `
  max-width: 50%;
  max-height: 500px;
`;

const ProductScreen = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  
   const { data, error, isLoading, isFetching, isSuccess } =
    useGetProductQuery(id);
  console.log(data);


  const [qty, setQty] = useState(1);
  const navigate = useNavigate();


  //const product = data.products.filter((x) => x._id ===id);
  if (!data) {
    return <div>Product not found</div>;
  }
   const payload = {
    name: data.name,
    image: data.image,
    price: data.price,
    countInstock: data.countInstock,
    product: data._id,
    qty
  }
  const addToCartHandler = (payload) => {
    navigate(`/cart/${id}?qty=${qty}`);
    dispatch(addToCart(payload));
  }
  return (
    <div>
      <Link to="/">Back to results</Link>
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
                          {[...Array(data.countInstock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
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
    </div>
  );
};

export default ProductScreen;
