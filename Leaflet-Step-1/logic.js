// Create a map object
var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5
});

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson"
d3.json(queryUrl, function(response) {
  var features = response.features;
  console.log(features);

  function chooseColor(earthquakeDepth) {
        if (earthquakeDepth >= -10 && earthquakeDepth < 10) {
          return "#93f542";
        }
        else if (earthquakeDepth >= 10 && earthquakeDepth < 30) {
          return "#bcf542";
        }
        else if (earthquakeDepth >= 30 && earthquakeDepth < 50) {
          return "#e9f542";
        }
        else if (earthquakeDepth >= 50 && earthquakeDepth < 70) {
          return "#f5b042";
        }
        else if (earthquakeDepth >= 70 && earthquakeDepth < 90) {
          return "#f57e42";
        }
        else {
          return "#f54242";
      }
    };
    for (var i = 0; i < features.length; i++) {
      var location = features[i].geometry;
      var properties = features[i].properties;
      if (location) {
        var circle = L.circle([location.coordinates[1], location.coordinates[0]], {
          stroke: true,
          weight: 0.5,
          color: "black",
          fillColor: chooseColor(location.coordinates[2]),
          fillOpacity: 1,
          radius: properties.mag * 15000
      }).bindPopup("<h3>" + features[i].properties.place + "<br>" +
          new Date(features[i].properties.time) + "<br>" +
          "Magnitude: " + features[i].properties.mag + "<br>").addTo(myMap)
    }
  }
})
