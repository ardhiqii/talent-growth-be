const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const router = express.Router();
const { signin, signup } = require("../controllers/auth.controller.js");
const verifyToken = require("../middlewares/authJWT.js");

router.post("/register", signup, function (req, res) {});

router.post("/login", signin, function (req, res) {});

router.get("/validate", verifyToken, function (req, res) {
//   res.send({ message: "LEO", data: req.user });
    if (!req.user) {
      res.status(403).send({
        message: "Invalid JWT token",
      });
    }
    if (req.user.role == "admin") {
      res.status(200).send({
        message:'User is Authenticated',
        isAuthenticated: true
      });
    } else {
      res.status(403).send({
        message: "Unauthorised access",
      });
    }
});

module.exports = router;
