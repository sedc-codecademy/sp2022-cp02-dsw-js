const User = require("../models/user.model");
const verifyAcessToken = require("../const/jwt.const");

const authValidator = async (req, res, next) => {
  try {
    const auhtorizationHeader = req.headers.authorization;
    console.log(auhtorizationHeader);

    if (!auhtorizationHeader) return res.sendStatus(403);

    const token = auhtorizationHeader.split(" ")[1];

    if (!token) return res.sendStatus(403);

    const { userId } = verifyAcessToken(token);

    const foundUser = await User.findById(userId);

    if (!foundUser) return res.sendStatus(403);

    req.user = foundUser;

    next();
  } catch (err) {
    res.sendStatus(403);
  }
};

module.exports = authValidator;
