const AuthService = require("../services/auth.service");

class AuthController {
  //Get all users
  static async getAllUsers(req, res) {
    try {
      const users = await AuthService.getAllUsers();
      res.status(200).send(users);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }

  static async registerUser(req, res) {
    try {
      const userData = req.body;

      const newUser = await AuthService.registerUser(userData);
      res.status(201).send(newUser);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
  static async loginUser(req, res) {
    try {
      const credentials = req.body;

      const user = await AuthService.loginUser(credentials);

      res.status(201).send(user);
    } catch (error) {
      console.log(error);
      res.status(401).send(error);
    }
  }
}

module.exports = AuthController;
