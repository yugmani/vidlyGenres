const express = require("express");
const { Movie, validMovie } = require("../models/genre");
const mongoose = require("mongoose");
const router = express.Router();

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
  const { error } = validMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let movie = new Movie({
    name: req.body.name,
  });

  movie = await movie.save(); // To save into mongoDB
  res.send(movie);
});

router.put("/:id", async (req, res) => {
  const { error } = validMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //to update mongoDB
  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!movie) {
    return res.status(400).send("The movie with the given id does not exist");
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

module.exports = router;
