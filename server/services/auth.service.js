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
//Middleware for hashing password before save
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password") || user.isNew) {
    const hashedPassword = await bcrypt.hash(user.password, 8);

    user.password = hashedPassword;

    return next();
  }

  return next();
});

//Schema method for comparing passwords
userSchema.methods.comparePasswords = async function (credentialsPassword) {
  const isPasswordValid = await bcrypt.compare(
    credentialsPassword,
    this.password
  );

  return isPasswordValid;
};

const User = mongoose.model("User", userSchema);
//------------------------------------------
// Auth service
class AuthService {
  //Get all users
  static async getAllUsers() {
    const users = await User.find({});

    return users;
  }

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

module.exports = { AuthService, User };
