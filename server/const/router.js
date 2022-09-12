const router = require("express").Router();

const productRouter = require("../routes/product.routes")

router.use("/products", productRouter)

module.exports = router;