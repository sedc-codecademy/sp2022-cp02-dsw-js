const router = require("express").Router();
const UserController = require("../controllers/user.controller");
const { authValidator, restrictTo } = require("../middlewares/auth.middleware");

// Get all users
router.get("/", restrictTo("admin"), UserController.getAllUsers);
//Update user
router.get("/:id", restrictTo("admin"), UserController.getUserById);
//Update user
router.patch("/:id", restrictTo("user"), UserController.updateUserInfo);

module.exports = router;
