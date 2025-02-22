const express = require("express");
const { placeOrder, getOrders } = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Place an order (Authenticated)
router.post("/place", authMiddleware, placeOrder);

// Get user orders (Authenticated)
router.get("/", authMiddleware, getOrders);

module.exports = router;
