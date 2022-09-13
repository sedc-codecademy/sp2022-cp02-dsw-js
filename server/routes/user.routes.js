const router = require("express").Router();
const UserController = require("../controllers/user.controller");

//Update user
router.patch("/:id", UserController.updateUserInfo);

module.exports = router;
