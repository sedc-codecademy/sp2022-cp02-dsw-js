const AuthService = require("../services/auth.service");
const {
  createAccessToken,
  createRefreshToken,
  // verifyAccessToken,
} = require("../const/jwt.const.js");

class AuthController {
  // 1. Register User
  static async registerUser(req, res) {
    try {
      // console.log(req.body);
      const userData = req.body;

      const user = await AuthService.registerUser(userData);

      const token = createAccessToken(user._id);

      // const refreshToken = createRefreshToken(user._id);

      // const newUser = await AuthService.saveRefreshToken(user, refreshToken);

      res.cookie("jwt", token, {
        expires: new Date(
          Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
      });

      res.status(201).send({
        ...user.toJSON(),
        // token
      });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
  //2. Login user
  static async loginUser(req, res) {
    try {
      const { email, password } = req.body;

      const user = await AuthService.loginUser(email, password);

      const token = createAccessToken(user._id);

      // const refreshToken = createRefreshToken(user._id);

      // await AuthService.saveRefreshToken(user, refreshToken);

      res.cookie("jwt", token, {
        expires: new Date(
          Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
      });

      res.status(200).send({
        ...user.toJSON(),
        // token
      });
    } catch (error) {
      console.log(error);
      res.status(401).send(error);
    }
  }
  // 3. Refresh access token
  static async refreshAcessToken(req, res) {
    try {
      const refreshToken = req.body.refreshToken;

      const user = await AuthService.validateRefreshToken(refreshToken);

      await AuthService.deleteRefreshToken(user, refreshToken);

      const token = createAccessToken(user._id);
      const newRefreshToken = createRefreshToken(user._id);

      await AuthService.saveRefreshToken(user, newRefreshToken);

      return res.status(200).send({ token, newRefreshToken });
    } catch (error) {
      console.log(error);
      res.sendStatus(403);
    }
  }
  // Logout user
  static async logoutUser(req, res) {
    try {
      console.log("ulazi u constoller");
      res.cookie("jwt", "loggedout", {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
      });
      res.status(200).json({ status: "success" });
      // const { _id } = req.body;

      // const { _id } = req.user;

      // const refreshToken = req.body.refreshToken;

      // await AuthService.deleteRefreshToken(_id);

      // res.sendStatus(204);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
}

module.exports = AuthController;
