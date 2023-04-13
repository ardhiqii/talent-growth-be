const jwt = require("jsonwebtoken");
const User = require("../models/user");

const verifyToken = async (req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    const decode = jwt.verify(
      req.headers.authorization.split(" ")[1],
      "TEMP_SECRET"
    );
    try {
      const user = await User.findOne({
        _id: decode.id,
      });
      if(user){
        req.user = user
        next()
      }
    } catch (e) {
      res.status(500).send({ message: e });
    }
  } else {
    req.user = undefined;
    next();
  }
};
module.exports = verifyToken;
