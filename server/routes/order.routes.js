const router = require("express").Router();
const OrderController = require("../controllers/order.controller");
const authValidator = require("../middlewares/auth.middleware");

//Get all Products
router.get("/", OrderController.getAllOrders);
//Get product by id
router.get("/:id", OrderController.getOrderById);
//Create new product
router.post("/", OrderController.createOrder);
//Update product
router.patch("/:id", OrderController.updateOrder);
//Delete product
router.delete("/:id", OrderController.deleteOrder);

module.exports = router;
