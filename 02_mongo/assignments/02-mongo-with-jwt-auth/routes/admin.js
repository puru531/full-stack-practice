const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin } = require("../db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../index");
const router = Router();

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic

  const username = req.body.username;
  const password = req.body.password;
  const name = req.body.name;

  const isAlreadyExists = await Admin.findOne({
    where: {
      username,
    },
    });

  console.log('=============== isAlreadyExists', isAlreadyExists);
  console.log('=============== id pass', username, password);

  if(!username || !password) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

    if (isAlreadyExists) {
    return res.status(400).json({ message: "Admin already exists" });
    }

  await Admin.create({
    username,
    password,
      name
  });

  res.json({ message: "Admin created successfully" });
});

router.post("/signin", async (req, res) => {
  // Implement admin signin logic

    const username = req.body.username;
    const password = req.body.password;

    const isValidated = await Admin.findOne({
        where: {
            username,
            password,
        },
    });

    if (!isValidated) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ username }, JWT_SECRET);

    res.json({ token });

});

router.post("/courses", adminMiddleware, (req, res) => {
  // Implement course creation logic
});

router.get("/courses", adminMiddleware, (req, res) => {
  // Implement fetching all courses logic
});

module.exports = router;
