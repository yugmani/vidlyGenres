const express = require("express");
const router = express.Router();

const html = `
<div class="container">
<h1>Vidly Movie Genres</h1>
<h3>Genres</h3>
<ul>
    <li>action</li>
    <li>romance</li>
    <li>horror</li>
</ul>
</div>
`;

router.get("/", (req, res) => {
  res.send(html);
});

module.exports = router;
