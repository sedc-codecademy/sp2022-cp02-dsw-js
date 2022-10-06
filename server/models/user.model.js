const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const { Schema } = mongoose;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: [true, "Please tell us your name"],
    minlength: [6, "Your name can not be less than 6 characters long"],
  },
  username: {
    type: String,
    required: [true, "Please tell us your username"],
    unique: [true, "This username already exists"],
    minlength: [6, "Username must be at least 6 characters long"],
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: (message) => "Invalid Email",
    },
    unique: [true, "This email already exists"],
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: [8, "Password has to be at least 8 characters long"],
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    trim: true,
    default: "user",
  },
  orders: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    default: [],
  },
  refreshToken: {
    type: String,
    default: "",
  },
});

userSchema.methods.comparePasswords = async function (loginPassword) {
  const user = this;

  const isPasswordValid = await bcrypt.compare(loginPassword, user.password);

  return isPasswordValid;
};

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password") || user.isNew) {
    const hashedPassword = await bcrypt.hash(user.password, 8);

    user.password = hashedPassword;
    return next();
  }

  return next();
});

userSchema.post("save", (error, _doc, next) => {
  if (error.code === 11000) {
    return next({ message: "Email Already Exists" });
  }

  return next();
});

userSchema.set("toJSON", {
  transform: function (_doc, ret, _opt) {
    delete ret.password;
    delete ret.__v;

    return ret;
  },
});

// Always needs to be the last line
const User = mongoose.model("User", userSchema);
module.exports = User;
