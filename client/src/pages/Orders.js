import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../features/orderSlice";
import { Card, CardContent, Typography, Container, Grid } from "@mui/material";

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (loading) return <Typography variant="h4">Loading orders...</Typography>;
  if (error)
    return (
      <Typography variant="h4" color="error">
        {error}
      </Typography>
    );

  return (
    <>
      <h1>Order placed</h1>
    </>
    // <Container>
    //   <Typography variant="h3" align="center" gutterBottom>
    //     Your Orders
    //   </Typography>
    //   {orders.length === 0 ? (
    //     <Typography variant="h5" align="center">No orders found</Typography>
    //   ) : (
    //     <Grid container spacing={3} justifyContent="center">
    //       {orders.map((order) => (
    //         <Grid item key={order._id}>
    //           <Card sx={{ minWidth: 300 }}>
    //             <CardContent>
    //               <Typography variant="h6">Order ID: {order._id}</Typography>
    //               <Typography variant="body2">Total Price: ${order.totalPrice}</Typography>
    //               <Typography variant="body2">Status: {order.status}</Typography>
    //             </CardContent>
    //           </Card>
    //         </Grid>
    //       ))}
    //     </Grid>
    //   )}
    // </Container>
  );
};

export default Orders;
