const express = require("express");
const app = express();
const google = require("./google");
const fpo = require("./fpo");

app.get("/", async (req, res) => {
  x = await google.getGoogle();
  res.json(x);
});

app.listen(3000);

//const googleData = google.getGoogle();
