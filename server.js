const express = require("express");
const app = express();
const google = require("./google");
const fpo = require("./fpo");
const cors = require("cors");
app.use(cors());

app.get("/results", async (req, res) => {
  fpoData = await fpo.getFPO();
  googleData = await google.getGoogle();

  const combinedData = [];

  await fpoData.map((currElement) => {
    currElement.forEach((subElement) => combinedData.push(subElement));
  });

  await googleData.map((currElement) => {
    currElement.forEach((subElement) => {
      if (!combinedData.includes(subElement)) {
        combinedData.push(subElement);
      }
    });
  });

  console.log(combinedData);

  res.json(combinedData);
});

app.listen(3000);
