/* eslint-disable no-undef */
import React, { Component } from 'react';
import {
    Box,
    Button,
    ButtonGroup,
    HStack,
    Input,
    Center,
    Container,
    Text
} from '@chakra-ui/react'
import { GoogleApiWrapper } from 'google-maps-react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';

var directionsRenderer;
var directionsService;
var mainMap;
var mac = { lat: 43.260988363514265, lng: -79.91930050375424 };
axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';

class MapContainer extends Component {
    state = {
        mileage: "No car selected yet",
        gasprice: 0,
        travel_distance: 0,
        totalPrice: 0
    };

    calcRoute = async () => {

        const setDistance = (val) => {
            this.setState({travel_distance: val/1000});
        }
        const setTotalPrice = async (val) => {
            let price = await val;
            //console.log(price);
            this.setState({totalPrice: price});
        }

        var start = document.getElementById('start').value;
        var end = document.getElementById('end').value;
        var travel_distance_test = 2;
        var mileage = this.state.mileage;
    
        // Set origin and destination and feed it to the directionsService
        if (start !== end && start !== '' && end !== '') {
            var request = {
                origin: start,
                destination: end,
                travelMode: 'DRIVING',
            };
    
            directionsService.route(request, function (result, status) {
                if (status === 'OK') {
                    directionsRenderer.setDirections(result);
                    //console.log(result.routes[0].legs[0].distance.value);
                    travel_distance_test = result.routes[0].legs[0].distance.value;
                    setDistance(travel_distance_test);
                    if (mileage === "No car selected yet"){
                        mileage = 11.7;
                    }

                    setTotalPrice(pathOverview(result, mileage));
                }
            });
        }
        // Reset map if input boxes are empty
        else {
            directionsRenderer.set('directions', null);
            mainMap.panTo(mac);
            mainMap.setZoom(13);
        }
        //this.setState({travel_distance: travel_distance_test});
    }

    calcCar = () => {
        var make = document.getElementById('make').value;
        var model = document.getElementById('model').value;

        // axios.get("http://localhost:3001/db/cardata/makes").then((response, error) => {
        //     console.log(response);
        // })

        // axios.get("http://localhost:3001/db/cardata/models/BMW").then((response, error) => {
        //     console.log(response);
        // })
        axios.get("http://localhost:3001/db/cardata/getMilage/"+ make + "/" + model).then((response, error) => {
            console.log(response);
            this.setState({mileage: response.data});
        })

        // axios.get("http://localhost:3001/gasprice/ontario").then((response, error) => {
        //     console.log(response);
        //     this.setState({gasprice: response.data});
        // })
    }

    render() {
        return (
            <Container>
                <Box>
                    <Center w='180px' h='100vh'>
                        <GoogleMapReact
                            google={this.props.google}
                            mapTypeControl={false}
                            style={{ width: '100%', height: '100%' }}
                            zoom={13}
                            center={mac}
                            yesIWantToUseGoogleMapApiInternals
                            onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
                        />
                    </Center>
                </Box>
                <Box
                position='absolute'
                zIndex='1'
                top = '0'
                left=  '0'
                right= '0'
                bottom= '0'
                maxW='200px'>
                    <Center
                        p={4}
                        borderRadius='lg'
                        m={4}
                        bgColor='white'
                        shadow='base'
                        minW='container.sm'
                        maxW='container.sm'
                    >
                        <HStack spacing={2} justifyContent='space-between'>
                            <Box flexGrow={1}>
                                <Input id='start' type='text' placeholder='Origin' />
                            </Box>
                            <Box flexGrow={1}>
                                <Input id='end' type='text' placeholder='Destination' />
                            </Box>
                            <ButtonGroup>
                                <Button colorScheme='blue' type='submit' onClick={this.calcRoute}>
                                    Calculate Route
                                </Button>
                            </ButtonGroup>
                        </HStack>
                    </Center>
                </Box>
                <Box
                position='absolute'
                zIndex='1'
                left=  '0'
                right= '0'
                bottom= '10'>
                    <Center
                        p={4}
                        borderRadius='lg'
                        m={4}
                        bgColor='white'
                        shadow='base'
                        maxW='600px'
                    >
                        <HStack spacing={2} justifyContent='stretch'>
                            <Box flexGrow={1}>
                                <Input id='make' type='text' placeholder='Make' />
                            </Box>
                            <Box flexGrow={1}>
                                <Input id='model' type='text' placeholder='Model' />
                            </Box>
                            <ButtonGroup >
                                <Button colorScheme='blue' type='submit' onClick={this.calcCar}>
                                    Select Car
                                </Button>
                            </ButtonGroup>
                        </HStack>
                    </Center>
                </Box>
                <Box
                position='absolute'
                zIndex='1'
                left=  '0'
                right= '0'
                bottom= '150'>
                    <Center
                        p={4}
                        borderRadius='lg'
                        m={4}
                        bgColor='white'
                        shadow='base'
                        maxW='600px'
                    >
                        <HStack spacing={2} justifyContent='stretch'>
                            <Box flexGrow={1}>
                                <Text>
                                    Mileage: {this.state.mileage} L/100km, Gas Price: ${this.state.gasprice}, 
                                </Text>
                                <Text>
                                    Distance: {this.state.travel_distance} km
                                </Text>
                                <Text>
                                    {/* Total price of trip: ${this.state.mileage*this.state.gasprice*this.state.travel_distance/100} */}
                                    Total price of trip: ${this.state.totalPrice}
                                </Text>
                            </Box>
                        </HStack>
                    </Center>
                </Box>
            </Container>
        );
    }

    //Car Selection
}



// Once API is loaded set map
const apiIsLoaded = (map, maps) => {
    if (map) {
        mainMap = map;
        directionsService = new google.maps.DirectionsService();
        directionsRenderer = new google.maps.DirectionsRenderer();
        directionsRenderer.setMap(map);
    }
}

function toRad(Value) {
    return Value * Math.PI / 180;
}

function calcDist(lat11, lon1, lat22, lon2) 
{
    var R = 6371; // km
    var dLat = toRad(lat22-lat11);
    var dLon = toRad(lon2-lon1);
    var lat1 = toRad(lat11);
    var lat2 = toRad(lat22);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c;
    return d;
}
// Calculate Route

async function getRoadGrade(points){
    var roadGrades = [];
    var elevation = [];
    var currGrade = 0;
    await axios.post("http://localhost:3001/db/retrieveElevation", {points: points}).then((response, error) => {
        elevation = response.data.elevation;
        //console.log(response.data.elevation.length, points.length);
        
        for (var i = 1; i < elevation.length; i++){
            currGrade = 100*(elevation[i]-elevation[i-1])/(calcDist(points[i].latitude,points[i].longitude,points[i-1].latitude,points[i-1].longitude)*1000);
            currGrade = Math.round(currGrade);
            //console.log(currGrade);
            if (currGrade > 5){
                currGrade = 5;
            }else if (currGrade < -5){
                currGrade = -5;
            }else if (isNaN(currGrade)){
                currGrade=0;
            }
            roadGrades.push(currGrade);
        }

        
    })

    return roadGrades;
}



// Gives an overview of the path in the console
async function pathOverview(directionResult, mileage) {
    const elevationInfluence = [0.6996,0.7476,0.7852,0.8267,0.9306,1,1.1841,1.3647,1.5740,1.7515,1.9147]
    var myRoute = directionResult.routes[0].overview_path;
    var points = [];
    var roadGrades = [];
    var price = 0;
    var Totalprice = 0;
    for (var i = 0; i < myRoute.length; i+=5) {
        // Display Lat and Lng of each point
        //console.log(myRoute[i].lat(), myRoute[i].lng());
        points.push({latitude: myRoute[i].lat(), longitude: myRoute[i].lng()});
    }

    await axios.post("http://localhost:3001/db/elevation", {points: points}).then((response, error) => {
        console.log(response);
    })

    if (myRoute.length % 5 !== 0){
        points.push({latitude: myRoute[myRoute.length-1].lat(), longitude: myRoute[myRoute.length-1].lng()});
    }
    
    //console.log(myRoute.length);

    roadGrades = await getRoadGrade(points);
    console.log(roadGrades);

    await axios.get("http://localhost:3001/gasprice/precise?lat="+points[0].latitude+"&long="+points[0].longitude).then((response, error) => {
        price = response.data.price/100;
        //console.log(mileage);
        for (var i = 1; i < roadGrades.length; i++) {
            console.log(elevationInfluence[roadGrades[i]+5]);
            Totalprice += price*mileage*(1/100)*calcDist(points[i].latitude,points[i].longitude,points[i-1].latitude,points[i-1].longitude)*elevationInfluence[roadGrades[i]+5];
        }
    });

    return Totalprice.toFixed(2);
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_API_KEY
})(MapContainer);