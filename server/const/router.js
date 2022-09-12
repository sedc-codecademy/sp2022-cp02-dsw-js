const router = require("express").Router();

const productsRouter = require("../routes/products.routes");
const authRouter = require("../routes/auth.routes");

router.use("/products", productsRouter);

router.use("/auth", authRouter);

module.exports = router;
