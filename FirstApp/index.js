const express = require("express");

const app = express();

const path = require("path");
const redditData = require("./data.json");

app.use(express.static(path.join(__dirname, "public")));

// app.use((req, res) => {
//   console.log("WE GOT A REQUEST");
//   res.send("WE GOT UR REQUEST, THIS UR RESPONSE");
// });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/rand", (req, res) => {
  const num = Math.floor(Math.random() * 10) + 1;
  res.render("random", { rand: num });
});

app.get("/r/:subreddit", (req, res) => {
  const { subreddit } = req.params;
  const data = redditData[subreddit];
  if (data) {
    res.render("subreddit", { ...data });
  } else {
    res.render("notfound", { subreddit });
  }
});

// app.get("/r/:subreddit", (req, res) => {
//   const { subreddit } = req.params;
//   res.send(`<h1>${subreddit} here iam waiting for you..<3!!</h1>`);
// });

// app.get("/dogs", (req, res) => {
//   res.send("WOOF");
// });

// app.get("*", (req, res) => {
//   res.send("i don't know that path");
// });

app.listen(3030, () => {
  console.log("LISTENING ON PORT 3030");
});
