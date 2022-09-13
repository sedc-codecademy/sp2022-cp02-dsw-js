const User = require("./auth.service");

class UserService {
  static async updateUser(userId, updateData) {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!user) {
      return Promise.reject({ message: "User not found" });
    }
    return user;
  }
}

module.exports = UserService;
