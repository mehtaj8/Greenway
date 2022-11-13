const express = require("express");
const router = express.Router();
const dotenv = require('dotenv');
const axios = require("axios");
const { MongoClient } = require('mongodb');
dotenv.config();
var db;
var collection;

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function connect() {
    await client.connect();
    console.log('Connected successfully to server');
    db = client.db('elevationData');
    collection = db.collection('elevationData');
}

connect();

async function getElevationData(points){
    let elevationData = [];
    for (let i = 0; i < points.length ;i++){
        await axios.get("https://maps.googleapis.com/maps/api/elevation/json?locations=" + points[i].latitude + "%2C" + points[i].longitude + "&key=" + process.env.MAPS_API_KEY)
        .then((response, err) => {
            console.log(response.data.results[0].elevation);
            elevationData.push(response.data.results[0].elevation);
        });
    }
    return elevationData;
}

router.post('/elevation', async(req, res) => {
    const points = req.body.points;
    const elevationList = await getElevationData(points);
    const itemList = [];


    for (let i = 0; i < elevationList.length; i++){
        itemList.push({
            longitude: points[i].longitude,
            latitude: points[i].latitude,
            elevation: elevationList[i]
        });
    }

    console.log(itemList);
    const insertResult = await collection.insertMany(itemList);
    console.log('Inserted documents =>', insertResult);

    res.send("Successfully added data");
});

module.exports = router;