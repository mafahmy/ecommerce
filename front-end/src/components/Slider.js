import React from 'react';
import styled from "styled-components";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const slideImages = [
    {original: 'images/slider/sliderCanon.jpg',
        description: 'Great Prouduct'
    },
    {original: 'images/slider/sliderDell.jpg'},
    {original: 'images/slider/sliderElec.jpg'},
    {original: 'images/slider/sliderSamsung.jpg'},
    {original: 'images/slider/sliderSamsungTv.jpg'}
];
const Container = styled.div `
    width: 100%;
    height: 100%;
    display: flex;

    position: relative;
    
    ` 
const Arrow = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    background-color: azure;
    border-radius: 50%;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    left: ${props=> props.direction === 'left' && '10px'};
    right: ${props=> props.direction === 'right' && '10px'};
    cursor: pointer;
    opacity: 0.5;

 `;
const Wrapper = styled.div `
    height: 100%;
    width: 100%;
`;
const Slide = styled.div `
    display: flex;
    align-items: center;
`;
const ImageContainer = styled.div `
width: 75%;
height: 100%;

background-image: url('images/slider/sliderDell.jpg');
    background-repeat: no-repeat;
    background-size: 75%;
`;
const Image = styled.img `

`;


export const Slider = () => {
  return (
      
    <Container>
        <Arrow direction='left'>
            <ArrowBackIosIcon></ArrowBackIosIcon>
        </Arrow>
        <Wrapper>
            <Slide>
            
            <ImageContainer>
                <Image/>
            </ImageContainer>
            </Slide>
        </Wrapper>
        <Arrow direction='right'>
            <ArrowForwardIosIcon></ArrowForwardIosIcon>
        </Arrow>
    </Container>
   
  )
}
