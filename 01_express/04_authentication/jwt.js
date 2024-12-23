const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

const jwtPassword = "123456";

const ALL_USERS = [
  {
    username: "admin1@gmail.com",
    password: "126546",
    name: "Admin1",
  },
  {
    username: "admin2@gmail.com",
    password: "122654",
    name: "Admin2",
  },
  {
    username: "admin3@gmai.com",
    password: "12356",
    name: "Admin3",
  },
];

function userExists(username, password) {
  return ALL_USERS.some(
    (user) => user.username === username && user.password === password
  );
}

app.use(express.json());

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (userExists(username, password)) {
    const token = jwt.sign({ username }, jwtPassword); // generate token with username as payload and jwtPassword as secret key for verification
    res.send(token);
  } else {
    res.status(401).send("Invalid username or password");
  }
});

app.get("/users", (req, res) => {
  const token = req.headers.authorization;

  try {
    const decoded = jwt.verify(token, jwtPassword); // verify token with jwtPassword
    res.send(ALL_USERS.map((user) => user.name));
  } catch (error) {
    res.status(401).send("Invalid token");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
