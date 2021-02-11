//model for movies.js
const Joi = require("joi");
const mongoose = require("mongoose");

// const movieSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     minlength: 5,
//     maxlength: 50,
//   },
// });

// const Movie = mongoose.model("Movie", "movieSchema");

//shorter: schema and model together
const Movie = mongoose.model(
  "Movie",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
  })
);

function validateMovie(body) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  const result = schema.validate(body);
  return result;
}

module.exports.Movie = Movie;
module.exports.validMovie = validateMovie;
