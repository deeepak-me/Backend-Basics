const express = require("express");

const app = express();
const User = require("./models/user");
const bcrypt = require("bcrypt");
const session = require("express-session");

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/authDemo");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: "notagoodsecret" }));

app.get("/", (req, res) => {
  res.send("THIS IS HOME PAGE");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  const { password, username } = req.body;
  const hash = await bcrypt.hash(password, 12);
  const user = new User({
    username,
    password: hash,
  });
  await user.save();
  req.session.user_id = user._id;
  res.redirect("/");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  const validPassword = user?.password
    ? await bcrypt.compare(password, user.password)
    : false;
  if (validPassword) {
    req.session.user_id = user._id;
    res.redirect("/secret");
  } else {
    res.redirect("/login");
  }
});

app.get("/secret", (req, res) => {
  if (!req.session.user_id) {
    res.redirect("/login");
  }
  res.send("THIS IS SECRET! YOU CANNOT SEE THIS UNTIL YOU GET LOGGED IN");
});
app.listen(3030, () => {
  console.log("SERVING ON PORT 3030");
});
