const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
// const jwtPassword = "123456";

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://puru531:<password>@cluster0.jtkfa.mongodb.net/user_app"
);

// Create a model
//model is a class that represents a collection in the database and is used to create, read, update, and delete documents from the collection
const User = mongoose.model("User", {
  name: String,
  email: String,
  password: String,
});

const app = express();
app.use(express.json());

// function userExists(username, password) {
//   // Check if the user exists in the database
// }

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).send("User already exists");
  }

  // Create a new user
  const user = new User({ name, email, password });
  try {
    await user.save();
    res.send("User created successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// app.post("/signin", (req, res) => {
//   const { username, password } = req.body;

//   if (userExists(username, password)) {
//     const token = jwt.sign({ username }, jwtPassword); // generate token with username as payload and jwtPassword as secret key for verification
//     res.send(token);
//   } else {
//     res.status(401).send("Invalid username or password");
//   }
// });

// app.get("/users", (req, res) => {
//   const token = req.headers.authorization;

//   try {
//     const decoded = jwt.verify(token, jwtPassword); // verify token with jwtPassword
//     res.send(ALL_USERS.map((user) => user.name));
//   } catch (error) {
//     res.status(401).send("Invalid token");
//   }
// });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
