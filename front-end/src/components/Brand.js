import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";

const Brand = ({ item }) => {
  return (
    <Card sx={{ maxWidth: 345 }} key={item._id}>
      <CardActionArea>
        <Link to={`/search/brand/${item.brand}`}>
          <CardMedia
            component="img"
            height="140"
            image={item.img}
            alt="green iguana"
          />
          <CardContent>
            <Typography
              sx={{ textAlign: "center" }}
              gutterBottom
              variant="h4"
              component="div"
            >
              {item.title}
            </Typography>
          </CardContent>
        </Link>
      </CardActionArea>
    </Card>
  );
};

export default Brand;
