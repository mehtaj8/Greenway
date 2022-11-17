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

module.exports = router;