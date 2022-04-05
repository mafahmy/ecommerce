import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const slideImages = [
  "images/slider/sliderCanon.jpg",
  "images/slider/sliderDell.jpg",
  "images/slider/sliderElec.jpg",
  "images/slider/sliderSamsung.jpg",
  "images/slider/sliderSamsungTv.jpg",
];
// const Wrapper = styled.div`
//     display: flex;
//     width: 100%;
//     height: 100%;
// `;
const SlideShow = styled.div`
  margin: 0 auto;
  overflow: hidden;
   max-width: 1000px; 
   

`;
const SlideShowSlider = styled.div`
  white-space: nowrap;
  transition: ease 1000ms;
  
`;
const Slide = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
    height:400px;
  width: 100%;
  /* border-radius: 30px; */
  background-repeat: no-repeat;
  background-size: cover;
  
  position: relative;
  align-items: center;
    justify-content: center;
    font-size: 2rem;
    font-weight: bolder;
    color: white;
`;
const SlideShowDots = styled.div`
  text-align: center;
`;
const SlideShowDot = styled.div`
  display: inline-block;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  cursor: pointer;
  margin: 15px 7px 0px;
  


`;
const Text = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: inherit;
    width: inherit;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    font-weight: bolder;
    color: white;
    
    
    
`;
const Slider1 = () => {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
      if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
      }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === slideImages.length - 1 ? 0 : prevIndex + 1
        ),
      2500
    );
    return () => {
        resetTimeout();
    };
  }, [index]);

  return (
     
    <SlideShow>
      <SlideShowSlider
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {slideImages.map((backgroundImage, index) => (
          <Slide
            key={index}
            style={{ backgroundImage: `url(${backgroundImage})` }}
          >
           
          </Slide>
        ))}
      </SlideShowSlider>

      <SlideShowDots>
        {slideImages.map((_, idx) => (
          <SlideShowDot key={idx} style={index === idx ?{ backgroundColor: 'gray' }:{ backgroundColor: 'darkgray' }}
          onClick = {() => {
              setIndex(idx);
          }} ></SlideShowDot>
        ))}
      </SlideShowDots>
    </SlideShow>
    
  );
};

export default Slider1;
