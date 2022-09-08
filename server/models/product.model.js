const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  // ...product scheme
})

const Product = mongoose.model("Product", productSchema);

module.exports = Product;