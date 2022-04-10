import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    flex: 1;
    margin: 6px;
    padding: 20px;
    height: 70vh;
    max-width: 250px;
    min-width: 200px;
    border:0.5px solid gray;
    box-shadow: 2 black;
   
    
    
    
`;
const Image = styled.img`
    width: 100%;
    height: 50%;
    object-fit: contain;
    
`;
const Info = styled.div`
    flex: 1;
    width: 100%;
    height: inherit;
    ;

`;

const Title = styled.p`
    text-align: center;
`;
const Button = styled.button`

`;
const CategoryItem = ({item}) => {
  return (
      <>
      
    <Container>
       <Image src={item.img}/>
        <Info>
           <Title>{item.title}</Title>
           <button className="primary block">SHOP NOW</button>
           </Info> 
    </Container>
    </>
  )
}

export default CategoryItem