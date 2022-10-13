const router = require("express").Router();
const AuthController = require("../controllers/auth.controller");
const { authValidator } = require("../middlewares/auth.middleware");

// 1. Register User
router.post("/register", AuthController.registerUser);
// 2. Login User
router.post("/login", AuthController.loginUser);
// 3. Refresh access token
router.post("/refresh-token", AuthController.refreshAcessToken);
// 4. Logout user
router.post("/logout", AuthController.logoutUser);

module.exports = router;
