// console.log("Hi")
require("dotenv").config();
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

app.use(express.json());

const posts = [
  { user_id: 1, title: "saber post title", username: "saber" },
  { user_id: 2, title: "ali post title", username: "ali" },
];

app.get("/posts", authToken, (req, res) => {
  //res.json(posts);
  res.json(
    posts.filter((post) => 
      post.user_id == req.user.id
      //post.username === req.user.name
    )
  );
});

app.post("/login", (req, res) => {
  // user auth
  const username = req.body.username;
  const id = req.body.id;
  const user = { name: username, id: id };

  const jwt_token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

  res.json({ jwt: jwt_token });
});

function authToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(401);
    //
    req.user = user;
    next();
  });
}

app.listen(3000);
