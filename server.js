const express = require("express");
const cors = require("cors");

const axios = require("axios");
var http = require("http");
var fetch = require("node-fetch");

var querystring = require("querystring");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/test1", async (req, res) => {
  let { number } = req.body;
  // console.log("req.body.number ",req.body.number)
  try {
    //--------------------------- 1st way : using http module --------------------------------
    const jsonData = { number };
    const jsonDataString = JSON.stringify(jsonData);

    /*var options = {
      host: "localhost",
      port: 3001,
      path: "/test",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": jsonDataString.length,
      },
    };

    // Create a request object
    const req = http.request(options, (res) => {
      console.log(`statusCode: ${res.statusCode}`);

      // Listen for data
      res.on("data", (chunk) => {
        console.log(`Response: ${chunk}`);
      });
    });

    // Handle any errors
    req.on("error", (error) => {
      console.error("Error:", error);
    });

    // Send JSON data with the request
    req.write(jsonDataString);
    req.end();*/

    //----------------------  2nd way : using axios  ----------------------------------------------------

    /*axios.post('http://localhost:3001/test', { number: req.body.number })
    .then((response) => {
      console.log('Response:', response.data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });*/

    //----------------------  3rd way : using node-fetch   ----------------------------------------------------

    const response = await fetch("http://localhost:3001/test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ number }),
    });
    const result = await response.json();
    res.json({ result });
  } catch (error) {
    console.log("ERROR - ", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
