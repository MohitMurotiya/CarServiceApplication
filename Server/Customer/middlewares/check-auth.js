const jwt = require("jsonwebtoken");
const authConfig = require("../config/authConfig");
const User = require("../model/customerModel");

//module.exports:  remove verifyToken
verifyToken = (req, res, next) => {
  try {
    //const token = req.headers.authorization.split(" ")[1];
    const token = req.headers["x-access-token"];
    //console.log(token);
    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }
    const decoded = jwt.verify(token, authConfig.secretKey);
    //req.userData = decoded;
    req.userId = decoded.userId;
    console.log(decoded.userId);
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Authentication Failed",
    });
  }
};

isCustomer = (req, res, next) => {
  User.findById(req.userId)
    .exec()
    .then((user) => {
      if (user.role === "CUSTOMER") {
        next();
        return;
      }
      res.status(403).json({
        message: "Not Authorized",
      });
    })
    .catch((err) => {
      console.log("Authorization Error: " + err);
      res.status(500).json({
        error: err,
      });
    });
};

const checkAuth = {
  verifyToken,
  isCustomer,
};

module.exports = checkAuth;
