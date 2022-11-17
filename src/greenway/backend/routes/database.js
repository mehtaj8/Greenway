const express = require("express");
const router = express.Router();
const dotenv = require('dotenv');
const axios = require("axios");
const { MongoClient } = require('mongodb');
dotenv.config();
var elevDB;
var elevCollection;
var carDB;
var carCollection;

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function connect() {
    await client.connect();
    console.log('Connected successfully to server');
    elevDB = client.db('elevationData');
    elevCollection = elevDB.collection('elevationData');
    carDB = client.db('carData');
    carCollection = carDB.collection('carData');
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

async function getCarMakes() {
    const makeList = await carCollection.distinct("Make");
    return makeList;
}

async function getCarModels(make) {
    //console.log(make);
    let models = [];
    let query = { Make: make };
    models = await carCollection.find(query);
    console.log(models);
    return models;
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
    const insertResult = await elevCollection.insertMany(itemList);
    console.log('Inserted documents =>', insertResult);

    res.send("Successfully added data");
});

router.get('/cardata/makes', async(req, res) => {
    const makeList = await getCarMakes();
    //console.log(makeList);

    res.send(makeList);
});

router.get('/cardata/models/:make', async(req, res) => {
    const make = req.params.make;
    //console.log(make);
    let out = [];
    const modelList = await getCarModels(make);
    modelList.toArray(function(err, result) {
        if (err) throw err;
        out = result;
    });
    console.log("MODEL LIST");
    console.log(out);

    res.send(out);
});

module.exports = router;