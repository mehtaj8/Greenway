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

async function getCarYears(){
    const yearList = await carCollection.distinct("Year");
    //console.log(yearList);
    return yearList;
}

async function getCarMakes(year) {
    const query = {"Year": {$eq: parseInt(year)}};
    const makeList = await carCollection.distinct("Make", query);
    return makeList;
}

async function getCarModels(year, make) {
    const query = {Year: {$eq: parseInt(year)}, Make: {$eq: make}};
    const modelList = await carCollection.distinct("Model", query);
    return modelList;
    
}

async function getCarData(year, make, model) {
    let query = {Year: {$eq: parseInt(year)}, Make: {$eq: make}, Model: {$eq: model}};
    const FuelComp = await carCollection.distinct("Fuel Consumption Comb (L/100 km)", query);
    return FuelComp;
    
}

function getElevationDB(long, lat){
    let query = { longitude: long,  latitude: lat };
    //models = await carCollection.find(query);
    return new Promise(function(resolve, reject) {
        elevCollection.find(query).toArray( function(err, docs) {
         if (err) {
           // Reject the Promise with an error
           return reject(err)
         }
   
         // Resolve (or fulfill) the promise with data
         return resolve(docs)
       })
    });
}

router.post('/retrieveElevation', async(req, res) => {
    const points = req.body.points;
    const elevationList = [];
    var currElev = 0;


    for (let i = 0; i < points.length; i++){
        currElev = await getElevationDB(points[i].longitude, points[i].latitude);
        if (currElev.length > 0){
            elevationList.push(currElev[0].elevation);
        }else {
            elevationList.push(currElev.elevation);
        }
        
    }

    //console.log(itemList);

    res.send({elevation: elevationList});
});

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

router.get('/cardata/years', async(req, res) => {
    const yearList = await getCarYears();
    res.send(yearList);

});

router.get('/cardata/makes/:year', async(req, res) => {
    const year = req.params.year;

    const makeList = await getCarMakes(year);
    //console.log(makeList);

    res.send(makeList);
});

router.get('/cardata/models/:year/:make', async(req, res) => {
    const make = req.params.make;
    const year = req.params.year;
    //console.log(make);
    const modelList = await getCarModels(year, make);
    //console.log(modelList);
    res.send(modelList);
});

router.get('/cardata/getMilage/:year/:make/:model', async(req, res) => {
    const year = req.params.year;
    const make = req.params.make;
    const model = req.params.model;

    const FuelComp = await getCarData(year, make, model);
    console.log(FuelComp);

    res.send(FuelComp);
});

module.exports = router;