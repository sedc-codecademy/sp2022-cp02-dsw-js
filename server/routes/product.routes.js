const router = require("express").Router();
const ProductController = require("../controllers/product.controller");
const authValidator = require("../middlewares/auth.middleware");

//Get all Products
router.get("/", ProductController.getAllProducts);
//Get product by id
router.get("/:id", ProductController.getProductById);
//Create new product
router.post("/", ProductController.createProduct);
//Update product
router.patch("/:id", ProductController.updateProduct);
//Delete product
router.delete("/:id", ProductController.deleteProduct);

module.exports = router;
