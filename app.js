const express = require("express");
const app = express();

app.get("/data", (req, res) => {
  crawwling().then((data) => {
    res.json(data);
  });
});

app.listen(3000, () => {
  console.log("App is running on port 3000");
});
