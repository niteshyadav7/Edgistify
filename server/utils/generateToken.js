const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");

const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: "1d" });
};

module.exports = generateToken;
