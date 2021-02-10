const express = require("express");
const Joi = require("joi");
const mongoose = require("mongoose");
const router = express.Router();

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

//GET

router.get("/", async (req, res) => {
  const movies = await Movie.find().sort("name");
  res.send(movies);
});

router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie) {
    return res.status(404).send("The movie with the given id does not exist");
  }
  res.send(movie);
});

//POST
router.post("/", async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let movie = new Movie({
    name: req.body.name,
  });

  movie = await movie.save(); // To save into mongoDB
  res.send(movie);
});

router.put("/:id", async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //to update mongoDB
  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!movie) {
    return res.status(404).send("The movie with the given id does not exist");
  }

  res.send(movie);
});

router.delete("/:id", async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);

  if (!movie) {
    return res.status(404).send("The movie with the given id does not exist");
  }

  res.send(movie);
});

function validateMovie(body) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  const result = schema.validate(body);
  return result;
}

module.exports = router;
