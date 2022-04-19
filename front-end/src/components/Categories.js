import { AlertTitle } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import CategoryItem from './CategoryItem';

const categories = [

    {
        id: 1,
        img: 'images/appleIphone13.jpg',
        title: 'Mobiles'
    },
    {
        id: 2,
        img: "images/lapTopDellI7.jpg",
        title: "LapTops",
    },
    {
        id: 3,
        img: "images/samsungtv.jpg",
        title: 'TV'
    },
    {
        id: 4,
        img: "images/canonEOSCam.jpg",
        title: "Cmeras"
    }

];

const Container = styled.div `
    display: flex;
    padding: 50px;
    justify-content: center;
    flex-wrap: wrap;
`;
const Categories = () => {
  return (
      <>
      <AlertTitle>SHOP BY CATEGORY</AlertTitle>
    <Container>
        
        {categories.map((item) => (
            <CategoryItem key={item.id} item= {item}/>
        ))}
    </Container>
    </>
  )
}

export default Categories