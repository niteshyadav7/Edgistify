# Edgistify API

A RESTful API for managing user authentication, products, cart, and orders.

## Table of Contents

- [Edgistify API](#edgistify-api)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
  - [API Endpoints](#api-endpoints)
    - [Authentication](#authentication)
    - [Products](#products)
    - [Cart](#cart)
    - [Orders](#orders)
  - [Technologies Used](#technologies-used)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/edgistify-api.git
   cd edgistify-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory and configure the following:

   ```env
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

4. Start the server:

   ```bash
   npm start
   ```

## API Endpoints

### Authentication

- **Register a new user**

  ```http
  POST /api/auth/register
  ```

  **Request Body:**

  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```

  **Response:**

  ```json
  {
    "message": "User registered successfully",
    "token": "your_jwt_token"
  }
  ```

- **User Login**

  ```http
  POST /api/auth/login
  ```

  **Request Body:**

  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

  **Response:**

  ```json
  {
    "message": "Login successful",
    "token": "your_jwt_token"
  }
  ```

### Products

- **Fetch All Products**

  ```http
  GET /api/products
  ```

  **Response:**

  ```json
  [
    {
      "_id": "product_id",
      "name": "Product Name",
      "price": 100
    }
  ]
  ```

- **Create a New Product** (Requires Authentication)

  ```http
  POST /api/products
  ```

  **Request Headers:**

  ```
  Authorization: Bearer your_jwt_token
  ```

  **Request Body:**

  ```json
  {
    "name": "New Product",
    "price": 150
  }
  ```

  **Response:**

  ```json
  {
    "message": "Product created successfully",
    "product": {
      "_id": "product_id",
      "name": "New Product",
      "price": 150
    }
  }
  ```

### Cart

- **Add to Cart** (Requires Authentication)

  ```http
  POST /api/cart/add
  ```

  **Request Headers:**

  ```
  Authorization: Bearer your_jwt_token
  ```

  **Request Body:**

  ```json
  {
    "productId": "product_id",
    "quantity": 2
  }
  ```

  **Response:**

  ```json
  {
    "message": "Product added to cart"
  }
  ```

- **View Cart** (Requires Authentication)

  ```http
  GET /api/cart
  ```

  **Request Headers:**

  ```
  Authorization: Bearer your_jwt_token
  ```

  **Response:**

  ```json
  [
    {
      "product": "product_id",
      "quantity": 2
    }
  ]
  ```

### Orders

- **Place an Order** (Requires Authentication)

  ```http
  POST /api/order/place
  ```

  **Request Headers:**

  ```
  Authorization: Bearer your_jwt_token
  ```

  **Response:**

  ```json
  {
    "message": "Order placed successfully",
    "orderId": "order_id"
  }
  ```

- **View Orders** (Requires Authentication)

  ```http
  GET /api/order
  ```

  **Request Headers:**

  ```
  Authorization: Bearer your_jwt_token
  ```

  **Response:**

  ```json
  [
    {
      "orderId": "order_id",
      "products": [
        {
          "product": "product_id",
          "quantity": 2
        }
      ],
      "status": "Processing"
    }
  ]
  ```

## Technologies Used

- Node.js
- Express.js
- MongoDB
- JWT Authentication

---

Feel free to contribute or raise issues!

