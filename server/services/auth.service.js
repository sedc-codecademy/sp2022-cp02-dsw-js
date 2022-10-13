const verifyRefreshToken = require("../const/jwt.const");
const User = require("../models/user.model");
const { Types } = require("mongoose");

class AuthService {
  // 1. Register user
  static async registerUser(userData) {
    try {
      const user = new User({ _id: new Types.ObjectId(), ...userData });

      const createdUser = await user.save();

      return createdUser;
    } catch (error) {
      throw error;
    }
  }
  // 2. Login user
  static async loginUser(email, password) {
    try {
      if (!email) throw "Please fill out your email field";
      if (!password) throw "Please fill out your password filed";

      let user = await User.findOne({ email }).select(" -role");

      if (!user) throw "Invalid Credentials";

      const isPasswordValid = await user.comparePasswords(password);

      if (!isPasswordValid) throw "Password is not correct, please try again";

      return user;
    } catch (error) {
      throw error;
    }
  }

  // Validate refresh token
  static async validateRefreshToken(refreshToken) {
    try {
      const { userId } = verifyRefreshToken(refreshToken);

      const foundUser = await User.findById(userId);

      if (!foundUser) throw new Error();

      if (!foundUser.refreshTokens.find((token) => token === refreshToken))
        throw new Error();

      return foundUser;
    } catch (error) {
      throw error;
    }
  }

  // Save refresh token

  // static async saveRefreshToken(user, refreshToken) {
  //   try {
  //     await User.findOneAndUpdate(
  //       { _id: user._id },
  //       { $set: { refreshToken: refreshToken } }
  //     );
  //   } catch (error) {
  //     console.log(error);
  //     throw error;
  //   }
  // }

  // Delete refresh token
  static async deleteRefreshToken(Id) {
    try {
      console.log(Id);
      await User.findOneAndUpdate({ _id: Id }, { $set: { refreshToken: "" } });
    } catch (error) {
      throw error;
    }
  }
  static async deleteAllRefreshTokens(user) {
    try {
      user.refreshTokens = [];

      await user.save();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AuthService;
