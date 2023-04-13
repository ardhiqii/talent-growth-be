const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const signup = async (req, res) => {
    
  const user = User({
    fullName: req.body.fullName,
    email: req.body.email,
    role: req.body.role,
    password: bcrypt.hashSync(req.body.password, 8),
  });
  try {
    const dataToSave = await user.save();
    const token = jwt.sign(
      {
        id: dataToSave.id,
      },
      "TEMP_SECRET",
      {
        expiresIn: 36000,
      }
    );
    return res.status(200).send({
      message: "User Registered successfully",
      accessToken:token
    });
  } catch (e) {
    return res.status(500).send({ message: e });
  }
};

const signin = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user) {
      return res.status(404).send({ message: "User Not Found " });
    }
    // Checking password
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }
    const token = jwt.sign(
      {
        id: user.id,
      },
      "TEMP_SECRET",
      {
        expiresIn: 36000,
      }
    );
    return res.status(200).send({
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
      },
      message: "Login successfull",
      accessToken: token,
    });
  } catch (e) {
    return res.status(500).send({ message: e });
  }
};

module.exports = { signin, signup };
