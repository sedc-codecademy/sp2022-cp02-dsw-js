const User = require("../models/user.model");
const { verifyAccessToken } = require("../const/jwt.const");

const authValidator = async (req, res, next) => {
  try {
    // 1) Getting token and check of it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    // const auhtorizationHeader = req.body.headers.authorization;

    // if (!auhtorizationHeader) return res.sendStatus(403);

    // const token = auhtorizationHeader.split(" ")[1];

    if (!token) return res.sendStatus(403);

    const { userId } = verifyAccessToken(token);

    const foundUser = await User.findById(userId);

    if (!foundUser) return res.sendStatus(403);

    req.user = foundUser;

    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(401);
  }
};

const restrictTo = (...roles) => {
  return async (req, res, next) => {
    try {
      // console.log("headers ", req.headers);
      // const userId = req.headers.userid;
      // console.log(userId);

      let token;
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        token = req.headers.authorization.split(" ")[1];
      } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
      }

      const { userId } = verifyAccessToken(token);

      const foundUser = await User.findOne({ _id: userId });

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
};

module.exports = { authValidator, restrictTo };
