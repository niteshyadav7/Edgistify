const Product = require("../models/Product");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, price, stock, image } = req.body;
    const product = await Product.create({ name, price, stock, image });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
