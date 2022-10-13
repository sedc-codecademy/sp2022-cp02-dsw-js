const router = require("express").Router();
const ContactController = require("../controllers/contact.controller");

//Create new order
router.post("/", ContactController.createOrder);

module.exports = router;
