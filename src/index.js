var map
var directionsRenderer
var directionsService
var stepDisplay
var markerArray = []

// Initilize map centered on McMaster University
function initMap() {
  directionsService = new google.maps.DirectionsService()
  directionsRenderer = new google.maps.DirectionsRenderer()

  const mac = { lat: 43.260988363514265, lng: -79.91930050375424 } // Coordinates to Hamilton, ON

  var mapOptions = {
    mapTypeControl: false,
    zoom: 13,
    center: mac,
  }

  map = new google.maps.Map(document.getElementById('map'), mapOptions)
  directionsRenderer.setMap(map)

  stepDisplay = new google.maps.InfoWindow() // Displays steps with information about each step
}

// Calculate Route
function calcRoute() {
  // Initialize marker array with null
  for (var i = 0; i < markerArray.length; i++) {
    markerArray[i].setMap(null)
  }

  var start = document.getElementById('start').value
  var end = document.getElementById('end').value

  // Set origin and destination and feed it to the directionsService
  if (start != end && start != '' && end != '') {
    var request = {
      origin: start,
      destination: end,
      travelMode: 'DRIVING',
    }

    directionsService.route(request, function (result, status) {
      if (status == 'OK') {
        directionsRenderer.setDirections(result)
        showSteps(result)
        pathOverview(result)
      }
    })
  } else {
    directionsRenderer.set('directions', null)
  }
}

// Show marker at each step
function showSteps(directionResult) {
  var myRoute = directionResult.routes[0].legs[0] // Collect legs of route

  for (var i = 0; i < myRoute.steps.length; i++) {
    // Create a marker at each step in the leg
    var marker = new google.maps.Marker({
      position: myRoute.steps[i].start_point,
      map: map,
    })
    attachCoords(marker, String(myRoute.steps[i].start_point)) // Attach coordinates to each marker on click
    markerArray[i] = marker
  }
}

// Attach coordinates to each marker
function attachCoords(marker, text) {
  google.maps.event.addListener(marker, 'click', function () {
    stepDisplay.setContent(text)
    stepDisplay.open(map, marker)
  })
}

// Gives an overview of the path in the console
function pathOverview(directionResult) {
  var myRoute = directionResult.routes[0].overview_path
  for (var i = 0; i < myRoute.length; i++) {
    // Display Lat and Lng of each point
    console.log(myRoute[i].lat(), myRoute[i].lng())
  }
}

window.initMap = initMap
document.getElementById('goBtn').addEventListener('click', calcRoute)
