const { User } = require("./auth.service");

class UserService {
  //Get user by id
  static async getUserById(userId) {
    console.log(userId);
    const user = await User.findById(userId);
    if (!user) return Promise.reject({ message: "User not found" });
    return user;
  }
  // Update User Info
  static async updateUser(userId, updateData) {
    const user = await this.getUserById(userId);

    const updateKeys = Object.keys(updateData);
    updateKeys.forEach((key) => {
      if (key !== "_id") {
        user[key] = updateData[key];
      }
    });
    const updatedUser = await user.save();
    return updatedUser;
  }
}

module.exports = UserService;
