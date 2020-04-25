require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const KEY = process.env.KEY;

app.use(cors());

app.get('/', (req, res) => {
  const url = ` http://api.weatherbit.io/v2.0/forecast/daily?key=${KEY}&days=8&units=I&lat=${req.query.q[0]}&lon=${req.query.q[1]}`
  axios.get(url)
  .then(response => response.data)
  .then(data => res.send(data))
  .catch(err => console.log(err))
});

app.get('/search', (req, res) => {
  const url = ` http://api.weatherbit.io/v2.0/forecast/daily?key=${KEY}&days=8&units=I&city=${req.query.q}`
  axios.get(url)
  .then(response => response.data)
  .then(data => res.send(data))
  .catch(err => console.log(err))
});




app.listen(3001, console.log("server listening on port 3001"));
