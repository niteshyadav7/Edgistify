const Order = require("../models/Order");
const Cart = require("../models/Cart");

// Place an order
const placeOrder = async (req, res) => {
  try {
    const { shippingAddress } = req.body;
    const userId = req.user.id;

    // Fetch user's cart
    const cart = await Cart.findOne({ userId }).populate("products.productId");

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Calculate total price
    let totalPrice = 0;
    const products = cart.products.map((item) => {
      totalPrice += item.quantity * item.productId.price;
      return {
        productId: item.productId._id,
        quantity: item.quantity,
        price: item.productId.price,
      };
    });

    // Create the order
    const order = new Order({
      userId,
      products,
      totalPrice,
      shippingAddress,
    });

    await order.save();

    // Clear user's cart after placing order
    await Cart.findOneAndDelete({ userId });

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get user's orders
const getOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    res.json({ orders });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { placeOrder, getOrders };
