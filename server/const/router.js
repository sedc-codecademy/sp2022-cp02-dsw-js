const router = require("express").Router();

const productRouter = require("../routes/product.routes");
const authRouter = require("../routes/auth.routes");
const orderRouter = require("../routes/order.routes");
const userRouter = require("../routes/user.routes");

router.use("/products", productRouter);

router.use("/auth", authRouter);

router.use("/order", orderRouter);

router.use("/user", userRouter);

module.exports = router;
