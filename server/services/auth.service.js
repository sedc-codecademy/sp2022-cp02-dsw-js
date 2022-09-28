const bcrypt = require("bcryptjs");
const { User } = require("../models/auth.model");

class AuthService {
  //Get all users
  static async getAllUsers() {
    const users = await User.find({});

    return users;
  }

  //Register
  static async registerUser(email, password, firstName, lastName, age) {
    const user = await User.findOne({ email });
    if (user) {
      return Promise.reject({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      const newUser = new User({
        email,
        password: hashedPassword,
        firstName,
        lastName,
        age,
      });
      await newUser.save();
      return Promise.resolve({ email });
    } catch (error) {
      console.log("asd");
      return Promise.reject(error);
    }
  }

  //Login
  static async loginUser(email, password) {
    try {
      const user = await User.findOne({ email });
      console.log("Inside model: ", user);
      if (!user) {
        return Promise.reject({ msg: "User does not exist!" });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      console.log(isPasswordValid);

      if (!isPasswordValid) {
        return Promise.reject({ msg: "Invalid Credentials" });
      }
      const { password: hashedPassword, ...userWithoutPassword } = user;

      return userWithoutPassword;
    } catch (error) {
      Promise.reject({ message: "Password is invalid" });
    }
  }

  // Save Refresh Token
  static async saveRefreshToken(userId, refreshToken) {
    const user = await User.findById(userId).exec();

    user.refreshTokens.push(refreshToken);

    await User.updateOne(
      { _id: userId },
      { $set: { refreshTokens: user.refreshTokens } }
    );
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  // Delete Refresh Token
  static async deleteRefreshToken(userId, refreshToken) {
    const user = await User.findById(userId).exec();

    user.refreshTokens = user.refreshTokens.filter(
      (token) => token !== refreshToken
    );

    await User.updateOne(
      { _id: userId },
      { $set: { refreshTokens: user.refreshTokens } }
    );
  }
}

// module.exports = { AuthService, User };
module.exports = { AuthService };
