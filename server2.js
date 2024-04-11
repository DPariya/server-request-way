const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3001;
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/test", (req, res) => {
  // console.log("This is second server ------- " ,req)

  res.status(200).json({ timeStamp: "abcs", number: req.body.number }); //req.body.number
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
