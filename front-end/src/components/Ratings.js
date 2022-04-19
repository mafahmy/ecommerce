import React from 'react'
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

const Ratings = ({rating, numReviews, size}) => {
  return (
    <Stack spacing={1}>
      <Rating name="half-rating-read" size={size} defaultValue={rating} precision={0.5} readOnly />
    </Stack>
  )
}

export default Ratings