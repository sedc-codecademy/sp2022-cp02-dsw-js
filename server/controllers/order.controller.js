const OrderService = require("../services/order.service");
const User = require("../models/user.model");
const Order = require("../models/order.model");
const sendEmail = require("../services/email");

class OrderController {
  //Get all orders
  static async getAllOrders(req, res) {
    try {
      const orders = await OrderService.getAllOrders();
      res.status(200).send(orders);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
  //Get order by id
  static async getOrderById(req, res) {
    try {
      const { id: orderId } = req.params;
      const order = await OrderService.getOrderById(orderId);
      if (!order)
        return res
          .status(404)
          .send({ message: `Order with id: ${orderId} not found` });
      res.status(200).send(order);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
  //Create new order
  static async createOrder(req, res) {
    try {
      const orderData = req.body;
      const message = `
      Hi dear ${orderData.name},

      We have recieved your order with following information:
      email: ${orderData.email},
      phone: ${orderData.phone},
      address: ${orderData.address} .

      Please check these info and let us know if something is not correct.

      Otherwise, your order will be proceeded to our delivery service.

      You have chosen ${orderData.shippingType} shipping and your total price is $${orderData.bill}.

      Thank you for the trust and have a nice day!

      Oryx Team `;
      console.log(orderData);
      const createdOrder = await OrderService.createOrder(orderData).then(
        async (newOrder) => {
          await User.findByIdAndUpdate(newOrder.userId, {
            $push: {
              orders: {
                _id: newOrder._id,
              },
            },
          });
          await sendEmail({
            email: orderData.email,
            subject: "ORYX Order",
            message,
          });
        }
      );
      res.status(201).send(createdOrder);
    } catch (error) {
      console.log(error);
      res.status(400).send({ error });
    }
  }
  //Update order
  static async updateOrder(req, res) {
    try {
      const orderId = req.params.id;
      const updateData = req.body;
      if (updateData.id)
        return send.status(400).send({ message: "Invalid update" });
      const updatedOrder = await OrderService.updateOrder(orderId, updateData);
      res.status(200).send(updatedOrder);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
  //Delete order
  static async deleteOrder(req, res) {
    try {
      const orderId = req.params.id;
      await OrderService.deleteOrder(orderId);
      res.status(200).send({ message: `Order with id: ${orderId} deleted` });
    } catch (error) {
      res
        .status(400)
        .send({ message: `Order with id: ${error.value} not found` });
    }
  }
}

module.exports = OrderController;
