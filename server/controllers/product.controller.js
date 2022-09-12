const ProductService = require("../services/product.service");

class ProductController {
  //Get all products
  static async getAllProducts(req, res) {
    try {
      const products = await ProductService.getAllProducts();
      res.status(200).send(products);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
  //Get product by id
  static async getProductById(req, res) {
    try {
      const { id: productId } = req.params
      const product = await ProductService.getProductById(productId);
      if (!product) return res.status(404).send({ message: `Product with id: ${productId} not found` })
      res.status(200).send(product);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
  //Create new product
  static async createProduct(req, res) {
    try {
      const productData = req.body;
      const createdProduct = await ProductService.createProduct(productData);
      res.status(201).send(createdProduct);
    } catch (error) {
      console.log(error);
      res.status(400).send({ error });
    }
  }
  //Update product
  static async updateProduct(req, res) {
    try {
      const productId = req.params.id;
      const updateData = req.body;
      if (updateData.id) return send.status(400).send({ message: "Invalid update" })
      const updatedProduct = await ProductService.updateProduct(productId, updateData);
      res.status(200).send(updatedProduct);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
  //Delete product
  static async deleteProduct(req, res) {
    try {
      const productId = req.params.id;
      await ProductService.deleteProduct(productId);
      res.status(200).send({ message: `Product with id: ${productId} deleted` });
    } catch (error) {
      res.status(400).send({ message: `Product with id: ${error.value} not found` });
    }
  }
}

module.exports = ProductController;