const sendMessage = require("../services/message");

class OrderController {
  //Create new order
  static async createOrder(req, res) {
    try {
      const messageData = req.body;

      await sendMessage({
        name: messageData.name,
        email: messageData.email,
        phone: messageData.phone,
        message: messageData.message,
      });
      res.status(201);
    } catch (error) {
      console.log(error);
      res.status(400).send({ error });
    }
  }
}

module.exports = OrderController;
