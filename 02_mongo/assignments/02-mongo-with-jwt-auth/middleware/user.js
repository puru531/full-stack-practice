const jwt = require("jsonwebtoken");
const secret = require("../index");

function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected

  // get the token from the header
  const token = req.headers.authorization;

  //Bearer token
  // convert the token to an array and get the second element
  const words = token.split(" ");
  const jwtToken = words[1];

  /*
    Install the jsonwebtoken package
    npm install jsonwebtoken

    import the jsonwebtoken 
    const jwt = require("jsonwebtoken");
    */

  //verify the token
  const decodedValue = jwt.verify(jwtToken, secret);
  if (decodedValue.username) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized Access" });
  }

  /*
  Difference between authentication and authorization
    Authentication is the process of verifying who you are.
    Authorization is the process of verifying what you have access to.
  */
}

module.exports = userMiddleware;
