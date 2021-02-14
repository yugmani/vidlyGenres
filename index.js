const express = require("express");
const mongoose = require("mongoose");
const app = express();
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const home = require("./routes/home");

mongoose
  .connect("mongodb://localhost/vidly", {
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connect to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.use(express.json());

app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/", home);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App is listening in the port: ${PORT}`);
});
