const User = require("../models/user.model");
const verifyAcessToken = require("../const/jwt.const");

const authValidator = async (req, res, next) => {
  try {
    const auhtorizationHeader = req.headers.authorization;

    if (!auhtorizationHeader) return res.sendStatus(403);

    const token = auhtorizationHeader.split(" ")[1];

    if (!token) return res.sendStatus(403);

    const { userId } = verifyAcessToken(token);

    const foundUser = await User.findById(userId);

    if (!foundUser) return res.sendStatus(403);

    req.user = foundUser;

    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(403);
  }
};

restrictTo = (...roles) => {
  return async (req, res, next) => {
    try {
      console.log("headers ", req.headers);
      const userId = req.headers.userid;
      console.log(userId);

      const foundUser = await User.findOne({ _id: userId });
      console.log("user: ", foundUser);
      if (!foundUser) return res.sendStatus(403);

      if (!roles.includes(foundUser.role))
        return res
          .status(403)
          .send({ message: `You have no permission to perform this action` });
    } catch (error) {
      console.log(error);
    }
    next();
  };

  // (...roles) => {
  //   return (req, res, next) => {
  //     if (!roles.includes(req.user.role)) {
  //       return next(
  //         new AppError("You do not have permission to perform this action", 403)
  //       );
  //     }

  //     next();
  //   };
};

module.exports = { authValidator, restrictTo };
