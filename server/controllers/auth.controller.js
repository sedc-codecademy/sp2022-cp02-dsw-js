const { AuthService } = require("../services/auth.service");

const {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
} = require("../const/jwt.const");

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
  //Register
  static async registerUser(req, res) {
    try {
      const { email, password, firstName, lastName, age } = req.body;

      const newUser = await AuthService.registerUser(
        email,
        password,
        firstName,
        lastName,
        age
      );
      res.status(201).json({ message: "User created" });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
  //Login
  static async loginUser(req, res) {
    try {
      const { email, password } = req.body;

      console.log("Inside controller: ", email, password);
      const user = await AuthService.loginUser(email, password);

      const userId = user._doc._id.toString();

      //Create and send access token to client
      const accessToken = createAccessToken(userId);
      console.log("Access token: ", accessToken);
      //Create and send refresh token to the client
      const refreshToken = createRefreshToken(userId);
      console.log("Refresh token: ", refreshToken);

      const userWithoutPassword = await AuthService.saveRefreshToken(
        userId,
        refreshToken
      );

      res.cookie("refresh-token", refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/refresh-token",
      });
      // console.log(req.headers);
      console.log("req.session: ", req.session);
      // console.log(req);
      res.status(201).json(userWithoutPassword, accessToken, refreshToken);
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: "Login failed" });
    }
  }

  // Logout user
  static async logoutUser(req, res) {
    try {
      console.log(req.params);
      const userId = req.params.id;
      const refreshToken = req.body.refreshToken;

      console.log("UserId: ", userId);
      console.log("refreshToken: ", refreshToken);

      await AuthService.deleteRefreshToken(userId, refreshToken);

      res.status(200).json({ message: "User successfully logged out!" });
    } catch (error) {
      res.status(400).json(error);
    }
  }
}

module.exports = AuthController;
