import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product._id));
  };

  return (
    <Card sx={{ maxWidth: 300, margin: 2 }}>
      <CardMedia component="img" height="140" image={product.image} alt={product.name} />
      <CardContent>
        <Typography variant="h6">{product.name}</Typography>
        <Typography variant="body2" color="text.secondary">${product.price}</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleAddToCart} 
          sx={{ marginTop: 2 }}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
