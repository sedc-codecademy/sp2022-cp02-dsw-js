// temp userSchema
const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 2,
    },
    lastName: {
      type: String,
      required: true,
      minLength: 2,
    },
    age: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      validate: {
        validator: (value) => validator.isEmail(value),
      },
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
//------------------------------------------
// Auth service
class AuthService {
  static async registerUser(userData) {
    const user = new User(userData);

    await user.save();

    return user;
  }
  static async loginUser(credentials) {
    const { email, password } = credentials;

    const user = await User.findOne({ email: email });

    if (!user) {
      return Promise.reject({ msg: "Invalid Credentials" });
    }

    const isPasswordValid = await user.comparePasswords(password);

    if (!isPasswordValid) {
      return Promise.reject({ msg: "Invalid Credentials" });
    }

    return user;
  }
}
