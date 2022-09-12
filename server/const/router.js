const router = require("express").Router();

const productRouter = require("../routes/product.routes");
const authRouter = require("../routes/auth.routes");

router.use("/products", productRouter);

router.use("/auth", authRouter);

module.exports = router;
