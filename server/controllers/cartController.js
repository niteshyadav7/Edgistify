const Cart = require("../models/Cart");

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, products: [{ productId, quantity }] });
    } else {
      const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }
    }
    
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate("products.productId");
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
