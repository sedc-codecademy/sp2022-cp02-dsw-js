const User = require("../services/auth.service");

class UserController {
  static async updateUserInfo(req, res) {
    try {
      const userId = req.params.id;
      const updateData = req.body;
      if (updateData.id)
        return send.status(400).send({ message: "Invalid update" });
      const updatedUser = await UserService.updateUser(userId, updateData);
      res.status(200).send(updatedUser);
    } catch (error) {
      console.log(error);
      res.status(404).send(error);
    }
  }
}

module.exports = UserController;
