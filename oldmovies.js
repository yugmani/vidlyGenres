//Using Array Hard coded Database
// const express = require("express");
// const Joi = require("joi");
// const mongoose = require("mongoose");
// const router = express.Router();

// const movieSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     minlength: 5,
//     maxlength: 50,
//   },
// });

// const Movie = new mongoose.model("Movie", movieSchema);

// const movies = [
//   {
//     id: 1,
//     name: "movie1",
//     genre: "action",
//   },
//   {
//     id: 2,
//     name: "movie2",
//     genre: "romance",
//   },
//   {
//     id: 3,
//     name: "movie3",
//     genre: "horror",
//   },
// ];

// //GET

// router.get("/", (req, res) => {
//   res.send(movies);
// });

// router.get("/api/genres", (req, res) => {
//   const genres = movies.map((item) => {
//     return item["genre"];
//   });

//   res.send(genres);
// });

// router.get("/api/genres/:genre", (req, res) => {
//   const selectGenre = req.params.genre;
//   const newMovies = movies.find((item) => {
//     return item["genre"] === selectGenre;
//   });
//   res.send(newMovies);
// });

// router.get("/:id", async (req, res) => {
//   const movie = movies.find((c) => {
//     return c.id === parseInt(req.params.id);
//   });

//   if (!movie) {
//     return res.status(404).send("The movie with the given id does not exist");
//   }
//   res.send(movie);
// });

// //POST
// router.post("/", async (req, res) => {
//   const schema = Joi.object({
//     name: Joi.string().min(3).required(),
//     genre: Joi.string().min(3).required(),
//   });

//   result = schema.validate(req.body);
//   console.log(result);
//   if (result.error) {
//     return res
//       .status(404)
//       .send("Name and Genre are required or must be 3 characters long");
//   } else {
//     const newId = movies.length + 1;
//     const newMovie = {
//       id: newId,
//       name: req.body.name,
//       genre: req.body.genre,
//     };
//     // movies.push(newMovie);
//     // res.send(newMovie);
//   }
// });

// router.put("/:id", async (req, res) => {
//   const movie = movies.find((item) => {
//     return item.id === parseInt(req.params.id);
//   });

//   if (!movie) {
//     return res.status(404).send("The movie with the given id does not exist");
//   }

//   const schema = Joi.object({
//     name: Joi.string().min(3).required(),
//     genre: Joi.string().min(3).required(),
//   });

//   result = schema.validate(req.body);
//   //   console.log(result);

//   if (result.error) {
//     return res
//       .status(404)
//       .send("Name and Genre are required or must be 3 characters long");
//   } else {
//     movie.name = req.body.name;
//     movie.genre = req.body.genre;
//     res.send(movie);
//   }
// });

// router.delete("/:id", async (req, res) => {
//   const movie = movies.find((item) => {
//     return item.id === parseInt(req.params.id);
//   });

//   if (!movie) {
//     return res.status(404).send("The movie with the given id does not exist");
//   }

//   const index = movies.indexOf(movie);
//   movies.splice(index, 1);
//   res.send(movie);
// });

// function validateMovie(movie) {
//   const schema = {
//     name: Joi.string().min(3).required(),
//   };

//   return Joi.validate(movie, schema);
// }

// module.exports = router;
