const UserService = require("../services/user.service");

class UserController {
  static async getUserById(req, res) {
    try {
      const userId = req.params.id;
      const user = await UserService.getUserById(userId);
      res.status(200).send(user);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }

  static async updateUserInfo(req, res) {
    try {
      const userId = req.params.id;
      const updateData = req.body;
      if (updateData.id)
        return send.status(400).send({ message: "Invalid data" });
      const updatedUser = await UserService.updateUser(userId, updateData);
      res.status(200).send(updatedUser);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
}

module.exports = UserController;
