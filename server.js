// console.log("Hi")
require("dotenv").config();
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

app.use(express.json());

const posts = [{ name: 1 }, { name: 2 }];

app.get("/", (req, res) => {
  res.json(posts);
});

app.post("/login", (req, res) => {
  // user auth
  const username = req.body.username;
  const user = { name: username };

  const jwt_token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

  res.json({ jwt: jwt_token });
});

app.listen(3000);
