const express = require("express");

const app = express();
const User = require("./models/user");

app.set("view engine", "ejs");
app.set("views", "views");

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/secret", (req, res) => {
  res.send("THIS IS SECRET! YOU CANNOT SEE THIS UNTIL YOU GET LOGGED IN");
});
app.listen(3030, () => {
  console.log("SERVING ON PORT 3030");
});
