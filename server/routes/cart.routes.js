const router = require("express").Router();
const cartController = require("../controllers/cart.controller");

// get cart
router.get("/:id", cartController.getCart);
// add new item to the cart
router.post("/:id", cartController.addCartItem);
// gelete item from the cart
router.delete("/:userId/:itemId", cartController.deleteCartItem);

module.exports = router;
