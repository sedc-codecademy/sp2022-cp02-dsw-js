const router = require("express").Router();

const productsRouter = require("../routes/products.routes")

router.use("/products", productsRouter)

module.exports = router;