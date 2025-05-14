import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
// import Db from "./dbcrud.js"; // Aggiungi l'estensione `.js` per i moduli ES
import opensea from "@api/opensea";

const app = express();
dotenv.config();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/api", router);

router.use((request, response, next) => {
  console.log("Server in funzione...");
  next();
});

router.route("/getchart/:id/:days").get((req, res) => {
  const coinId = req.params.id;
  const coinChartDays = req.params.days;
  // console.log(req.params)
  const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${coinChartDays}`;
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

  console.log(Date.now);
});

router.route("/getchart/candle/:id/:days").get((req, res) => {
  const coinId = req.params.id;
  const coinChartDays = req.params.days;

  const url = `https://api.coingecko.com/api/v3/coins/${coinId}/ohlc?vs_currency=usd&days=${coinChartDays}`;
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
});

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
});

router.route("/trend").get((req, res) => {
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
});

router.route("/coinlist").get((req, res) => {
  let obj;
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
});

router.route("/coinlistData").get((req, res) => {
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
});

router.route("/coindata/:id").get((req, res) => {
  let coinId = req.params.id;
  console.log(coinId);
  const url = `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-cg-demo-api-key": `${process.env.COINGECKO_API_KEY}`,
    },
  };
  console.log(url);

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => res.send(json))
    .catch((err) => console.error(err));
});

router.route("/getaccounts").get((req, res) => {
  Db.getElencoAccount().then((data) => {
    res.json(data[0]);
  });
});

router.route("/account").post((req, res) => {
  console.log("POST AVVENUTO");
  let nuovoAccount = { ...req.body };
  // console.log(nuovoAccount)
  Db.aggiungiAccount(nuovoAccount).then((data) => {
    res.status(201).json(data);
  });
});

router.route("/login").post((req, res) => {
  // console.log(req.body)
  let email = req.body.emailForm;
  let password = req.body.passwordForm;
  Db.Login(email, password).then((data) => {
    res.status(201).json(data);
  });
});

router.route("/collections").get((req, res) => {
  opensea.auth(process.env.OPENSEA_KEY);
  opensea
    .list_collections({ order_by: "market_cap" })
    .then(({ data }) => res.send(data))
    .catch((err) => console.error(err));
});

router.route("/collections/next/:next").get((req, res) => {
  console.log("next");
  const Next = req.params.next;
  opensea.auth(process.env.OPENSEA_KEY);
  opensea
    .list_collections({ next: Next })
    .then(({ data }) => res.send(data))
    .catch((err) => console.error(err));
});

router.route("/collections/:id").get((req, res) => {
  const nftCollection = req.params.id;
  console.log("id");
  console.log(req.params);
  opensea.auth(process.env.OPENSEA_KEY);
  opensea.server("https://api.opensea.io");
  opensea
    .get_collection({ collection_slug: nftCollection })
    .then(({ data }) => res.send(data))
    .catch((err) => console.error(err));
});

router.route("/collections/:id/nfts").get((req, res) => {
  opensea.auth(process.env.OPENSEA_KEY);
  opensea.server("https://api.opensea.io");
  opensea
    .list_nfts_by_collection({ collection_slug: req.params.id })
    .then(({ data }) => res.send(data))
    .catch((err) => console.error(err));
});

router.route("/collections/:id/nfts/:next").get((req, res) => {
  opensea.auth(process.env.OPENSEA_KEY);
  opensea.server("https://api.opensea.io");
  opensea
    .list_nfts_by_collection({
      collection_slug: req.params.id,
      next: req.params.next,
    })
    .then(({ data }) => res.send(data))
    .catch((err) => console.error(err));
});

router.route("/item/:chain/:address/:id").get((req, res) => {
  opensea.auth(process.env.OPENSEA_KEY);
  opensea.server("https://api.opensea.io");
  opensea
    .get_nft({
      chain: req.params.chain,
      address: req.params.address,
      identifier: req.params.id,
    })
    .then(({ data }) => res.send(data))
    .catch((err) => console.error(err));
});

router.route("/collections/:id/nfts/:next").get((req, res) => {
  opensea.auth(process.env.OPENSEA_KEY);
  opensea.server("https://api.opensea.io");
  opensea
    .list_nfts_by_collection({
      collection_slug: req.params.id,
      next: req.params.next,
    })
    .then(({ data }) => res.send(data))
    .catch((err) => console.error(err));
});

router.route("/collection/:collection/identifier/:identifier/listing").get((req, res) => {
  console.log("listing");
  opensea.auth(process.env.OPENSEA_KEY);
  opensea.server("https://api.opensea.io");
  opensea
    .get_best_listing_on_nft_v2({
      collection_slug: req.params.collection,
      identifier: req.params.identifier,
    })
    .then(({ data }) => res.send(data))
    .catch((err) => console.error(err));
});

router.route("/conversion/:currency/:chain").get((req, res) => { 
  const url = `https://api.coingecko.com/api/v3/simple/price?vs_currencies=${req.params.currency}&ids=${req.params.chain}`;
  const options = {
    method: 'GET',
    headers: {accept: 'application/json', 'x-cg-demo-api-key': `${process.env.COINGECKO_API_KEY}`},
  };

  fetch(url, options)
    .then(res => res.json())
    .then(json => res.send(json))
    .catch(err => console.error(err));
})

router.route('/collection/:collection/identifier/:id/bestOffer').get((req, res) => {
  console.log("best offer") 
  opensea.auth(process.env.OPENSEA_KEY);
  opensea.server("https://api.opensea.io");
  opensea
    .get_best_offer_on_nft_v2({
      collection_slug: req.params.collection,
      identifier: req.params.id,
    })
    .then(({ data }) => res.send(data))
    .catch((err) => console.error(err));
});

router.route('/collections/:id/stats').get((req, res) => { 
  opensea.auth(process.env.OPENSEA_KEY);
  opensea.server("https://api.opensea.io");
  opensea
    .get_collection_stats({ collection_slug: req.params.id })
    .then(({ data }) => res.send(data))
    .catch((err) => console.error(err));
})

var port = process.env.PORT || 8090;
app.listen(port);
console.log(`Le API sono in ascolto su http://localhost:${port}/api`);
