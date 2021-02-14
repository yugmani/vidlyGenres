const express = require("express");
const { Genre, validGenre } = require("../models/genre");
const mongoose = require("mongoose");
const router = express.Router();

//GET

router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre) {
    return res.status(404).send("The genre with the given id does not exist");
  }
  res.send(genre);
});

//POST
router.post("/", async (req, res) => {
  const { error } = validGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({
    name: req.body.name,
  });

  genre = await genre.save(); // To save into mongoDB
  res.send(genre);
});

router.put("/:id", async (req, res) => {
  const { error } = validGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //to update mongoDB
  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!genre) {
    return res.status(400).send("The genre with the given id does not exist");
  }

  res.send(genre);
});

router.delete("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre) {
    return res.status(404).send("The genre with the given id does not exist");
  }

  res.send(genre);
});

module.exports = router;
