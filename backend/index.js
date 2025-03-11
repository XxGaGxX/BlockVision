var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var app = express();
var router = express.Router();
require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/api", router);

router.use((request, response, next) => {
  console.log("Server in funzione..." );
  next();
});

router.route("/getchart/:id/:days").get((req, res) => {
  coinId = req.params.id;
  coinChartDays = req.params.days
  const url =
    `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${coinChartDays}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-cg-demo-api-key": `${process.env.COINGECKO_API_KEY}`,
    },
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => {
      let htmlResponse = JSON.stringify(
        json,
        null,
        2
      );
      res.send(htmlResponse);
    })
    .catch((err) => console.error(err)); 
  
  console.log(Date.now)
})

router.route("/coinlist").get((req, res) => {
  let obj
  const url = "https://api.coingecko.com/api/v3/coins/list";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-cg-demo-api-key": `${process.env.COINGECKO_API_KEY}`,
    },
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => {let htmlResponse =JSON.stringify(
      json,
      null,
      2
    );
    res.send(htmlResponse);
    })
    .catch((err) => console.error(err));
})

router.route("/coindata/:id").get((req, res) => {
  let coinId = req.params.id
  const url =
    `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-cg-demo-api-key": `${process.env.COINGECKO_API_KEY}`,
    },
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => {let htmlResponse = `<html><body><pre>${JSON.stringify(
      json,
      null,
      2
    )}</pre></body></html>`;
    res.send(htmlResponse);})
    .catch((err) => console.error(err));
})


var port = process.env.PORT || 8090;
app.listen(port);
console.log(`Le API sono in ascolto su http://localhost:${port}/api`);
