import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Ratings from '../components/Ratings';
import data from '../data';
import styled from 'styled-components';
import { useGetProductQuery } from '../features/products/productsApi';



const Image = styled.img`
    max-width: 50%;
    max-height: 500px;
`;


const ProductScreen = (props) => {

    const { id } = useParams();
    console.log(id)
    const { data, error, isLoading, isFetching, isSuccess } = useGetProductQuery(id);
    console.log(data)
    //const product = data.products.filter((x) => x._id ===id);
    if (!data) {
        return <div>Product not found</div>;
    }
  return (
    <div>
        <Link to="/">Back to results</Link>
        <div className='row top'>
            <div className='col-2'>
                <Image src={data.image} alt={data.name}></Image>
                {console.log(data.image)}
            </div>
            <div className='col-1'>
                <ul>
                    <li>
                        <h1>{data.name}</h1>
                    </li>
                    <li>
                        <Ratings
                            size="large"
                            rating={data.rating} />
                    </li>
                    <li>
                        Price : LE{data.price}
                    </li>
                    <li>
                        Description:
                        <p>{data.description}</p>
                    </li>
                </ul>
            </div>
            <div className='col-1'>
                <div className='card card-body'>
                    <ul>
                        <li>
                            <div className='row'>
                                <div>Price</div>
                                <div className='price'>{data.price}</div>
                            </div>
                        </li>
                        <li>
                            <div className='row'>
                                <div>Status</div>
                                <div>
                                    {data.countInstock > 0 ? (
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