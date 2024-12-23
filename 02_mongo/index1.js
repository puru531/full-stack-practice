/*
This code sets up a basic Express server with MongoDB integration and JWT for user authentication.

1. Import required modules:
   - express: A web framework for Node.js.
   - jwt: A library for JSON Web Tokens.
   - mongoose: An ODM (Object Data Modeling) library for MongoDB.

2. Connect to MongoDB using mongoose.connect() with the provided connection string.

3. Define a User model using mongoose.model(). The User model represents a collection in the database and is used to create, read, update, and delete documents from the collection. The User model has three fields: name, email, and password.

4. Create an Express application instance using express().

5. Use express.json() middleware to parse JSON request bodies.

6. Define a POST /signup route to handle user signup:
   - Extract name, email, and password from the request body.
   - Check if a user with the same email already exists in the database using User.findOne().
   - Create a new User instance with the extracted data.
   - Save the user to the database using user.save().
   - Send a success response if the user is created successfully.
   - Send an error response if there is an error during user creation.

7. Start the Express server on port 3000 and log a message to the console.
*/

const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

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

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
