const express = require("express");
const Joi = require("joi");
const app = express();
const movies = require("./routes/movies");
const home = require("./routes/home");

app.use(express.json());

app.use("/api/movies", movies);
app.use("/", home);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App is listening in the port: ${PORT}`);
});
