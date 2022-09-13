const CartService = require("../services/cart.service");
const ProductService = require("../services/product.service");

class CartController {
  // Get all cart items
  static async getCart(req, res) {
    try {
      const { id: userId } = req.params;
      const cart = await CartService.getAllItems(userId);
      if (cart && cart.items.length > 0) {
        res.status(200).send(cart);
      } else {
        res.send(null);
      }
    } catch (error) {
      console.log(err);
      res.status(500).send("Something went wrong");
    }
  }

  static async addCartItem(req, res) {
    const userId = req.params.id;
    const { productId, quantity } = req.body;
    try {
      let cart = await CartService.getCart({ userId });
      let product = await ProductService.getProductById({ _id: productId });
      if (!product) {
        res.status(404).send({ message: "Product not found" });
      }
      const price = product.price;
      const name = product.name;

      if (cart) {
        // if cart exists for the user
        const itemIndex = cart.items.findIndex((p) => p.productId == productId);

        // Check if product exists or not
        if (itemIndex > -1) {
          const product = cart.items[itemIndex];
          product.quantity += quantity;
          cart.items[itemIndex] = product;
        } else {
          cart.items = [...cart.items, { productId, name, quantity, price }];
        }
        cart.bill += quantity * price;
        cart = await cart.save();
        return res.status(201).send(cart);
      }
    } catch (error) {
      console.log(err);
      res.status(500).send("Something went wrong");
    }
  }

  static async deleteCartItem(req, res) {
    const userId = req.params.userId;
    const productId = req.params.itemId;
    try {
      let cart = await CartService.getCart({ userId });
      let itemIndex = cart.items.findIndex((p) => p.productId == productId);
      if (itemIndex > -1) {
        let productItem = cart.items[itemIndex];
        cart.bill -= productItem.quantity * productItem.price;
        cart.items.splice(itemIndex, 1);
      }
      cart = await cart.save();
      return res.status(201).send(cart);
    } catch (err) {
      console.log(err);
      res.status(500).send("Something went wrong");
    }
  }
}

module.exports = CartController;
