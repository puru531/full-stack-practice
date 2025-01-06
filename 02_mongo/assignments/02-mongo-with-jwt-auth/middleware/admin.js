const jwt = require("jsonwebtoken");
const secret = require("../index");

// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  //get the token from the header
  const token = req.headers.authorization; // headers are case-insensitive

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
  // if the token is valid, the decodedValue will have the username, else it will be null.
  // if username is present, then run the next middleware, otherwise return an error message
  if (decodedValue.username) {
    next();
  } else {
    res.status(401).json({ message: "You are not authenticated!" });
  }
}

module.exports = adminMiddleware;
