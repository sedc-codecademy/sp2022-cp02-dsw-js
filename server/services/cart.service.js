const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

class CartService {
  // get users cart items
  static async getCart(userId) {
    const cart = await Cart.findOne({ userId });
    if (!cart) return Promise.reject({ message: "Cart not found" });
    return cart;
  }
}

module.exports = CartService;
