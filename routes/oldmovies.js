const express = require("express");
const router = express.Router();

const genres = [
  {
    id: 1,
    genre: "action",
  },
  {
    id: 2,
    genre: "romance",
  },
  {
    id: 3,
    genre: "horror",
  },
];

//GET

router.get("/", (req, res) => {
  res.send(genres);
});

router.get("/api/genres", (req, res) => {
  const genres = genres.map((item) => {
    return item["genre"];
  });

  res.send(genres);
});

router.get("/api/genres/:genre", (req, res) => {
  const selectGenre = req.params.genre;
  const newGenre = genres.find((item) => {
    return item["genre"] === selectGenre;
  });
  res.send(newGenre);
});

router.get("/:id", (req, res) => {
  const newGenres = genres.find((c) => {
    return c.id === parseInt(req.params.id);
  });

  if (!newGenres) {
    return res.status(404).send("The genre with the given id does not exist");
  }
  res.send(newGenres);
});

//POST
router.post("/", (req, res) => {
  const schema = Joi.object({
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
    const newGenre = {
      id: newId,
      genre: req.body.genre,
    };
    genres.push(newGenre);
    res.send(newGenre);
  }
});

router.put("/:id", (req, res) => {
  const newGenre = genres.find((item) => {
    return item.id === parseInt(req.params.id);
  });

  if (!newGenre) {
    return res.status(404).send("The genre with the given id does not exist");
  }

  const schema = Joi.object({
    newGenre: Joi.string().min(3).required(),
  });

  result = schema.validate(req.body);
  console.log(result);
  if (result.error) {
    return res
      .status(404)
      .send("Genre are required or must be 3 characters long");
  } else {
    newGenre.genre = req.body.genre;
    res.send(newGenre);
  }
});

router.delete("/:id", (req, res) => {
  const genre = genres.find((item) => {
    return item.id === parseInt(req.params.id);
  });

  if (!genre) {
    return res.status(404).send("The genre with the given id does not exist");
  }
  const index = genres.indexOf(movie);
  genres.splice(index, 1);
  res.send(genre);
});

// module.exports = router;
