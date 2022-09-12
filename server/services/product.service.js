const Product = require("../models/product.model");

class ProductService {
  //Get all products
  static async getAllProducts() {
    const products = await Product.find({});
    return products;
  }
  //Get product by id
  static async getProductById(productId) {
    const product = await Product.findById(productId);
    if (!product) return Promise.reject({ message: "Product not found" });
    return product;
  }
  //Create new product
  static async createProduct(productData) {
    const products = await this.getAllProducts();
    const product = new Product(productData);

    const productExists = products.some(product => product.name.toLowerCase() === productData.name.toLowerCase() && product.brand.toLowerCase() === productData.brand.toLowerCase());
    if (productExists) return new Promise.reject({ message: "Product already exists" });

    const newProduct = await product.save();
    return newProduct;
  }
  //Update product
  static async updateProduct(productId, updateData) {
    const product = await this.getProductById(productId);
    if (!product) return Promise.reject({ message: "Product not found" });

    const productKeys = Object.keys(product);
    console.log(productKeys.length);

    const updateKeys = Object.keys(updateData);
    updateKeys.forEach(key => {
      if (key !== "_id") {
        product[key] = updateData[key];
      }
    });

    const updatedProduct = await product.save();
    return updatedProduct;
  }
  //Delete product
  static async deleteProduct(productId) {
    await Product.findByIdAndDelete(productId);
  }
};

module.exports = ProductService;