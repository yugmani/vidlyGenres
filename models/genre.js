//model for movies.js
const Joi = require("joi");
const mongoose = require("mongoose");

// const genreSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     minlength: 5,
//     maxlength: 50,
//   },
// });

// const Genre = mongoose.model("Genre", "genreSchema");

//shorter: schema and model together
const Genre = mongoose.model(
  "Genre",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
  })
);

function validateGenre(body) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  const result = schema.validate(body);
  return result;
}

module.exports.Genre = Genre;
module.exports.validGenre = validateGenre;
