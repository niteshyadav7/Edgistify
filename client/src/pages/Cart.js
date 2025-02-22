import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../features/cartSlice";
import { placeOrder } from "../features/orderSlice";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Container,
  Grid,
} from "@mui/material";

const Cart = () => {
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handlePlaceOrder = () => {
    dispatch(placeOrder());
  };
  
  if (loading) return <Typography variant="h4">Loading cart...</Typography>;
  if (error)
    return (
      <Typography variant="h4" color="error">
        {error}
      </Typography>
    );

  return (
   
    <Container>
      <Typography variant="h3" align="center" gutterBottom>
        Your Cart
      </Typography>
      {cart.length === 0 ? (
        <Typography variant="h5" align="center">
          Cart is empty
        </Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {cart.products.map((item) => (
            <Grid item key={item.productId._id}>
              <Card sx={{ minWidth: 300 }}>
                <CardContent>
                  <Typography variant="h6">{item.productId.name}</Typography>
                  <Typography variant="body2">
                    Quantity: {item.quantity}
                  </Typography>
                  <Typography variant="body2">
                    Price: ${item.productId.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      {cart?.products?.length > 0 && (
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handlePlaceOrder}
        >
          Place Order
        </Button>
      )}
    </Container>
  );
};

export default Cart;
