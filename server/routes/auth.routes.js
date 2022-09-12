const router = require("express").Router();
const AuthController = require("../controllers/auth.controller");

//Get all users
router.get("/", AuthController.getAllUsers);

router.post("/register", AuthController.registerUser);
router.post("/login", AuthController.loginUser);

module.exports = router;
