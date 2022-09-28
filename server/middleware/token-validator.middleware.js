const { verifyAccessToken } = require("../const/jwt.const");
const { User } = require("../models/auth.model");

const tokenValidator = async (req, res, next) => {
  try {
    //Checking if we recieved an authorization header
    const authorizationHeader = req.headers.authorization;
    console.log("Auth: ", req.session);
    if (!authorizationHeader)
      return res.status(403).json({ message: "You are not authorized!" });

    //Taking out the token from the string
    const token = authorizationHeader.split(" ")[1];

    //We verify the token and extract the payload
    const { userId } = verifyAccessToken(token);

    //Checking if the user exists
    const user = User.findById(userId);

    if (!user) return res.status(403).json({ message: "User does not exist" });

    next();
  } catch (error) {
    console.log(error);
    res.status(403).send(error);
  }
};

module.exports = tokenValidator;
