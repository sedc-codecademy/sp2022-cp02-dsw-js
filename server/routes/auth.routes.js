const router = require("express").Router();
const AuthController = require("../controllers/auth.controller");
const tokenValidator = require("../middleware/token-validator.middleware");
const userValidator = require("../middleware/user-validator.middleware");

//Get all users
// router.get("/", tokenValidator, AuthController.getAllUsers);
router.get("/", AuthController.getAllUsers);

// http://localhost:3000/api/auth/register
router.post("/register", userValidator, AuthController.registerUser);
// http://localhost:3000/api/auth/login
router.post("/login", AuthController.loginUser);
// http://localhost:3000/api/auth/logout
router.post("/logout", AuthController.logoutUser);

module.exports = router;
