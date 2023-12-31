const jwt = require("jsonwebtoken");

const secretKey = process.env.SECRET_KEY;

module.exports.generateJwtToken = async (userId, name, email) => {
  return await jwt.sign({ userId, name, email }, secretKey, {
    expiresIn: "48h",
  });
};
