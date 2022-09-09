const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [2, "Name length must be greater than or equal to 2"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [1, "Price must be greater than or equal to 1"]
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    minlength: [2, "Category length must be greater than or equal to 2"],
    trim: true,
  },
  brand: {
    type: String,
    required: [true, "Brand is required"],
    minlength: [2, "Category length must be greater than or equal to 2"],
  },
  gender: {
    type: String,
    enum: {
      values: ["male", "female"],
      message: "Gender is either: male or female"
    },
    required: [true, "Gender is required"],
  },
  sale: {
    type: Boolean,
    default: false,
    required: [true, "Sale is required"],
  },
  stock: {
    type: Number,
    required: [true, "Stock is required"],
    min: [0, "Stock number must be greater than or equal to 0"]
  },
  discountPrice: {
    type: Number,
    min: [1, "Discount price must be greater than or equal to 1"],
  },
  size: {
    type: [String],
    enum: {
      values: ["xs", "s", "m", "l", "xl"],
      message: "Size can be: xs, s, m, l and xl"
    },
    required: [true, "Size is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    minlength: [3, "Description length must be greater than or equal to 3 characters"],
  },
  image: {
    type: String,
    minlength: [3, "Image url must be greater than or equal to 3 characters"],
  },
},
  {
    timestamps: true,
  })

const Product = mongoose.model("Product", productSchema);

module.exports = Product;