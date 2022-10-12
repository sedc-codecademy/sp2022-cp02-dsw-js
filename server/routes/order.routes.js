const router = require("express").Router();
const OrderController = require("../controllers/order.controller");
const { authValidator, restrictTo } = require("../middlewares/auth.middleware");

//Get all Orders
router.get(
  "/",
  authValidator,
  restrictTo("admin"),
  OrderController.getAllOrders
);
//Get order by id
router.get(
  "/:id",
  authValidator,
  restrictTo("admin"),
  OrderController.getOrderById
);
//Create new order
router.post("/", authValidator, OrderController.createOrder);
//Update order
router.patch("/:id", restrictTo("admin"), OrderController.updateOrder);
//Delete order
router.delete("/:id", restrictTo("admin"), OrderController.deleteOrder);

module.exports = router;
