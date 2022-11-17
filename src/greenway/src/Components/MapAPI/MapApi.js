/* eslint-disable no-undef */
import React, { useState,Component } from 'react';
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
        travel_distance: 0
    };

    calcRoute = () => {

        const setDistance = (val) => {
            this.setState({travel_distance: val/1000});
        }

        var start = document.getElementById('start').value;
        var end = document.getElementById('end').value;
        var travel_distance_test = 2;
    
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
                    console.log(result.routes[0].legs[0].distance.value);
                    travel_distance_test = result.routes[0].legs[0].distance.value;
                    setDistance(travel_distance_test);
                    pathOverview(result);
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

        axios.get("http://localhost:3001/gasprice/ontario").then((response, error) => {
            console.log(response);
            this.setState({gasprice: response.data});
        })
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
                                    Total price of trip: ${this.state.mileage*this.state.gasprice*this.state.travel_distance/100}
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

// Calculate Route

// Gives an overview of the path in the console
function pathOverview(directionResult) {
    var myRoute = directionResult.routes[0].overview_path;
    var points = [];
    for (var i = 0; i < myRoute.length; i++) {
        // Display Lat and Lng of each point
        //console.log(myRoute[i].lat(), myRoute[i].lng());
        points.push({latitude: myRoute[i].lat(), longitude: myRoute[i].lng()});
    }
    
    axios.post("http://localhost:3001/db/elevation", {points: points}).then((response, error) => {
        console.log(response);
    })
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_API_KEY
})(MapContainer);