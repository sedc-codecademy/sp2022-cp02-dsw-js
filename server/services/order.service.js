const Order = require("../models/order.model");

class OrderService {
  //Get all rrders
  static async getAllOrders() {
    const orders = await Order.find({});
    return orders;
  }
  //Get order by id
  static async getOrderById(orderId) {
    const order = await Order.findById(orderId);
    if (!order) return Promise.reject({ message: "Order not found" });
    return order;
  }
  //Create new order
  static async createOrder(orderData) {
    const order = new Order(orderData);

    const newOrder = await order.save();
    return newOrder;
  }
  //Update order
  static async updateOrder(orderId, updateData) {
    const order = await this.getOrderById(orderId);
    if (!order) return Promise.reject({ message: "Order not found" });

    const orderKeys = Object.keys(order);
    console.log(orderKeys.length);

    const updateKeys = Object.keys(updateData);
    updateKeys.forEach((key) => {
      if (key !== "_id") {
        order[key] = updateData[key];
      }
    });

    const updatedOrder = await order.save();
    return updateOrder;
  }
  //Delete order
  static async deleteOrder(orderId) {
    await Order.findByIdAndDelete(orderId);
  }
}

module.exports = OrderService;
