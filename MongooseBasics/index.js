const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/movieApp")
  .then(() => {
    console.log("CONNECTION OPEN");
  })
  .catch((err) => {
    console.log("OH NO ERROR");
    console.log(err);
  });

const movieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  score: Number,
  rating: String,
});

const Movie = mongoose.model("Movie", movieSchema);
// const  = new Movie({
//   title: "",
//   year: ,
//   score: 9.,
//   rating: "R",
// });

// Movie.insertMany([
//   { title: "Amelie", year: 2000, score: 9.3, rating: "R" },
//   { title: "Alien", year: 1979, score: 9.6, rating: "R" },
//   { title: "The Iron Giant", year: 1999, score: 8.5, rating: "PG" },
//   { title: "Stand By Me", year: 1989, score: 9.1, rating: "PG-13" },
//   { title: "Moonrise Kingdom", year: 1012, score: 9, rating: "R" },
// ]).then((data) => {
//   console.log("yeas");
//   console.log(data);
// });
