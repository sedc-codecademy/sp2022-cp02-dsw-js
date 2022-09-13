const router = require("express").Router();

const productRouter = require("../routes/product.routes");
const authRouter = require("../routes/auth.routes");
const cartRouter = require("../routes/cart.routes");
const userRouter = require("../routes/user.routes");

router.use("/products", productRouter);

router.use("/auth", authRouter);

router.use("/cart", cartRouter);

router.use("/user", userRouter);

module.exports = router;
