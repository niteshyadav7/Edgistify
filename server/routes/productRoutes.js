const express = require("express");
const { getAllProducts, createProduct } = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getAllProducts);
router.post("/", authMiddleware, createProduct);

module.exports = router;
