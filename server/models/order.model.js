const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    userId: {
      type: String,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please give us your name"],
    },
    email: {
      type: String,
      required: [true, "Please give us your email"],
    },
    phone: {
      type: String,
      required: [true, "Please give us your phone number"],
    },
    adress: {
      type: String,
      required: [true, "Please give us your phone address"],
    },
    items: [
      {
        productId: {
          type: String,
        },
        name: String,
        quantity: {
          type: Number,
          required: true,
          min: [1, "Quantity can not be less then 1."],
        },
        price: Number,
      },
    ],
    bill: {
      type: Number,
      required: true,
    },
    dayOfDelivery: {
      type: String,
      default: "Monday",
    },
    shippingType: {
      type: String,
      enum: ["Standard", "Express"],
      default: "Standard",
    },
  },
  { timestamps: true }
);

module.exports = Order = mongoose.model("order", orderSchema);
