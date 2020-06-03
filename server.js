// console.log("Hi")

const express = require("express");
const app = express();

const posts = [{ name: 1 }, { name: 2 }];

app.get("/", (req, res) => {
  res.json(posts);
});

app.listen(3000);
