const Member = require("../model/memberModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const authConfig = require("../config/authConfig");

exports.login = (req, res, next) => {
  Member.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Authentication Failed",
        });
      } else {
        bcrypt.compare(req.body.password, user.password, (err, response) => {
          if (err) {
            return res.status(401).json({
              message: "Authentication Failed",
            });
          } else if (response) {
            const token = jwt.sign(
              {
                userId: user._id,
              },
              authConfig.secretKey,
              {
                expiresIn: "1h",
              }
            );
            return res.status(200).json({
              message: "Authentication Successful",
              userId: user._id,
              name: user.name,
              email: user.email,
              role: user.role,
              token: token,
            });
          } else {
            return res.status(401).json({
              message: "Authentication Failed",
            });
          }
        });
      }
    })
    .catch((err) => {
      console.log("Login: " + err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.register = (req, res, next) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  Member.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Member Already Exist",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const member = new Member({
              _id: new mongoose.Types.ObjectId(),
              name: req.body.name,
              email: req.body.email,
              password: hash,
              mobile: req.body.mobile,
            });
            member
              .save()
              .then((result) => {
                console.log(result);
                res.status(201).json({
                  message: "Registered Successfully",
                  user: result,
                });
              })
              .catch((err) => {
                console.log("Registration Error" + err);
                res.status(500).json({
                  Registartion_Error: err,
                });
              });
          }
        });
      }
    });
};
