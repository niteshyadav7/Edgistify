const Order = require("../models/Order");
const Cart = require("../models/Cart");

exports.placeOrder = async (req, res) => {
  try {
    const { shippingAddress } = req.body;
    const userId = req.user.id;
    
    const cart = await Cart.findOne({ userId }).populate("products.productId");
    if (!cart || cart.products.length === 0) return res.status(400).json({ message: "Cart is empty" });

    const totalPrice = cart.products.reduce((acc, item) => acc + item.productId.price * item.quantity, 0);
    const order = await Order.create({
      userId,
      products: cart.products.map(p => ({ productId: p.productId._id, quantity: p.quantity, price: p.productId.price })),
      totalPrice,
      shippingAddress
    });

    await Cart.deleteOne({ userId });
    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).populate("products.productId");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
