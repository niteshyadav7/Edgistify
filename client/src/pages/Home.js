import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/productSlice";
import ProductCard from "../components/ProductCard";
import { Grid, Container, Typography } from "@mui/material";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <Typography variant="h4">Loading products...</Typography>;
  if (error) return <Typography variant="h4" color="error">{error}</Typography>;

  return (
    <Container>
      <Typography variant="h3" align="center" gutterBottom>
        All Products
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {products.map((product) => (
          <Grid item key={product._id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
