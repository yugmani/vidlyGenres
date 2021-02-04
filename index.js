const express = require("express");
const Joi = require("joi");
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

const movies = [
  {
    id: 1,
    name: "movie1",
    genre: "action",
  },
  {
    id: 2,
    name: "movie2",
    genre: "romance",
  },
  {
    id: 3,
    name: "movie3",
    genre: "horror",
  },
];

//GET
app.get("/", (req, res) => {
  res.send("Vidly Genres");
});

app.get("/api/movies", (req, res) => {
  res.send(movies);
});

app.get("/api/genres", (req, res) => {
  const genres = movies.map((item) => {
    return item["genre"];
  });

  res.send(genres);
});

app.get("/api/genres/:genre", (req, res) => {
  const selectGenre = req.params.genre;
  const newMovies = movies.find((item) => {
    return item["genre"] === selectGenre;
  });
  res.send(newMovies);
});

app.get("/api/movies/:id", (req, res) => {
  const newMovies = movies.find((c) => {
    return c.id === parseInt(req.params.id);
  });

  if (!newMovies) {
    return res.status(404).send("The movie with the given id does not exist");
  }
  res.send(newMovies);
});

//POST
app.post("/api/movies/", (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    genre: Joi.string().min(3).required(),
  });

  result = schema.validate(req.body);
  console.log(result);
  if (result.error) {
    return res
      .status(404)
      .send("Name and Genre are required or must be 3 characters long");
  } else {
    const newId = movies.length + 1;
    const newMovie = {
      id: newId,
      name: req.body.name,
      genre: req.body.genre,
    };
    movies.push(newMovie);
    res.send(newMovie);
  }
});

app.put("/api/movies/:id", (req, res) => {
  const movie = movies.find((item) => {
    return item.id === parseInt(req.params.id);
  });

  if (!movie) {
    return res.status(404).send("The movie with the given id does not exist");
  }

  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    genre: Joi.string().min(3).required(),
  });

  result = schema.validate(req.body);
  console.log(result);
  if (result.error) {
    return res
      .status(404)
      .send("Name and Genre are required or must be 3 characters long");
  } else {
    movie.name = req.body.name;
    movie.genre = req.body.genre;
    res.send(movie);
  }
});

app.delete("/api/movies/:id", (req, res) => {
  const movie = movies.find((item) => {
    return item.id === parseInt(req.params.id);
  });

  if (!movie) {
    return res.status(404).send("The movie with the given id does not exist");
  }
  const index = movies.indexOf(movie);
  movies.splice(index, 1);
  res.send(movie);
});

app.listen(PORT, () => {
  console.log(`App is listening in the port: ${PORT}`);
});
