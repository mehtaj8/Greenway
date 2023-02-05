const express = require("express");
const router = express.Router();
const dotenv = require('dotenv');
const axios = require("axios");
dotenv.config();

router.get('/ontario', async(req, res) => {
    let out = [];
    let headers = { "content-type": "application/json", "authorization": process.env.GAS_PRICE_API_KEY };
    await axios.get("https://api.collectapi.com/gasPrice/canada", { headers }).then((response, err) => {
        out = response.data.result[6].gasoline;
    });

    res.send(out);
});

router.get('/precise', async(req, res) => {
    let lat = req.query.lat;
    let long = req.query.long;
    let out = 0;
    await axios.post("https://www.gasbuddy.com/gaspricemap/county?lat="+lat+"&lng="+long+"&usa=false").then((response, err) => {
        out = response.data[0].Price;
    });

    res.send({price: out});
});

module.exports = router;