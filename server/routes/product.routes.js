const router = require("express").Router();
const ProductController = require("../controllers/product.controller");
const { authValidator, restrictTo } = require("../middlewares/auth.middleware");

//Get all Products
router.get("/", ProductController.getAllProducts);
//Get product by id
router.get("/:id", ProductController.getProductById);
//Create new product
router.post("/", restrictTo("admin"), ProductController.createProduct);
//Update product
router.patch("/:id", restrictTo("admin"), ProductController.updateProduct);
//Delete product
router.delete("/:id", restrictTo("admin"), ProductController.deleteProduct);

module.exports = router;
