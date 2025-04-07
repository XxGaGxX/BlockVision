var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var app = express();
var router = express.Router();
require("dotenv").config();
var Db = require("./dbcrud");

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
    .then((json) => res.send(json))
    .catch((err) => console.error(err));
  
  
  console.log(Date.now)
})

router.route("/nft").get((req, res) => {
  const url = "https://api.coingecko.com/api/v3/nfts/list";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-cg-demo-api-key": `${process.env.COINGECKO_API_KEY}`,
    },
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => res.send(json))
    .catch((err) => console.error(err));
})

router.route('/trend').get((req, res) => {
    const url = " https://api.coingecko.com/api/v3/search/trending";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": `${process.env.COINGECKO_API_KEY}`,
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => res.send(json))
      .catch((err) => console.error(err));
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
    .then((json) => res.send(json))
    .catch((err) => console.error(err));
  
})

router.route('/coinlistData').get((req, res) => {
    const url =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&price_change_percentage=1h%2C24h%2C7d&precision=2";
      const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": `${process.env.COINGECKO_API_KEY}`,
      },
    };

    fetch(url, options)
    .then((res) => res.json())
    .then((json) => res.send(json))
    .catch((err) => console.error(err));
  
})

router.route("/coindata/:id").get((req, res) => {
  let coinId = req.params.id
  const url =
    `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-cg-demo-api-key": `${process.env.COINGECKO_API_KEY}`,
    },
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => res.send(json))
    .catch((err) => console.error(err));
  }
)

router.route('/getaccounts').get((req, res) => {
  Db.getElencoAccount().then((data) => {
    res.json(data[0])
  })
})

router.route('/account').post((req, res) => {
  console.log("POST AVVENUTO")
  let nuovoAccount = { ...req.body }
  // console.log(nuovoAccount)
  Db.aggiungiAccount(nuovoAccount).then((data) => {
    res.status(201).json(data)
  })
})

router.route('/login').post((req, res) => {
  // console.log(req.body)
  let email = req.body.emailForm
  let password = req.body.passwordForm
  Db.Login(email, password).then((data) => {
    res.status(201).json(data)
    console.log(data)
  })
})


var port = process.env.PORT || 8090;
app.listen(port);
console.log(`Le API sono in ascolto su http://localhost:${port}/api`);


//TODO da implementare API nft https://docs.alchemy.com/reference/getnftsforowner-v3