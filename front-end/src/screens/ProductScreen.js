import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Ratings from '../components/Ratings';
import data from '../data';
import styled from 'styled-components';

const Image = styled.img`
    max-width: 50%;
    max-height: 500px;
`;

const ProductScreen = (props) => {
    const { id } = useParams();
    const product = data.products.filter((x) => x._id ===id);
    if (!product) {
        return <div>Product not found</div>;
    }
  return (
    <div>
        <Link to="/">Back to results</Link>
        <div className='row top'>
            <div className='col-2'>
                <Image src={product[0].image} alt={product.name}></Image>
                {console.log(product[0].image)}
            </div>
            <div className='col-1'>
                <ul>
                    <li>
                        <h1>{product[0].name}</h1>
                    </li>
                    <li>
                        <Ratings
                            size="large"
                            rating={product[0].rating} />
                    </li>
                    <li>
                        Price : LE{product[0].price}
                    </li>
                    <li>
                        Description:
                        <p>{product[0].description}</p>
                    </li>
                </ul>
            </div>
            <div className='col-1'>
                <div className='card card-body'>
                    <ul>
                        <li>
                            <div className='row'>
                                <div>Price</div>
                                <div className='price'>{product[0].price}</div>
                            </div>
                        </li>
                        <li>
                            <div className='row'>
                                <div>Status</div>
                                <div>
                                    {product[0].countInstock > 0 ? (
                                        <span className='success'>In Stock</span>
                                    ):(
                                        <span className='danger'>Out of Stock</span>
                                    )}
                                </div>
                            </div>
                        </li>
                        <li>
                            <button className='primary block'>Add to Cart</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductScreen;