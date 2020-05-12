const RandomGenerator = require("random-points-generator");
var geojson2csv = require("geojson2csv");

// -----> Example Coordinate array to generate random geo point
var coordinateLatLonArray = [
  // border poligon
  [15.541106, 38.197325],
  [15.537675, 38.194089],
  [15.534587, 38.190583],
  [15.535101, 38.186942],
  [15.538361, 38.18411],
  [15.542307, 38.181009],
  [15.544023, 38.177907],
  [15.54265, 38.172782],
  [15.545224, 38.16995],
  [15.550542, 38.170084],
  [15.556032, 38.175345],
  [15.56015, 38.178986],
  [15.56238, 38.183976],
  [15.570615, 38.189639],
  [15.570615, 38.190988],
  [15.563409, 38.187077],
  [15.558091, 38.188021],
  [15.55689, 38.192741],
  [15.558262, 38.200156],
  [15.561694, 38.20474],
  [15.557405, 38.210267],
  [15.547454, 38.20838],
  [15.547282, 38.205953],
  [15.545395, 38.201909],
  [15.541106, 38.197325],
  // fill poligon
  [15.545395, 38.201909],
  [15.557685, 38.197038],
  [15.537675, 38.194089],
  [15.558091, 38.188021],
  [15.538361, 38.18411],
  [15.56015, 38.178986],
  [15.544023, 38.177907],
  [15.552831, 38.172277],
  [15.547454, 38.20838],
  [15.561694, 38.20474]
];
// Example Coordinate array to generate random geo point <------

var geoJSONLoc = [];

coordinateLatLonArray.forEach((latLon, index) => {
  if (index < coordinateLatLonArray.length - 1) {
    const minX = latLon[0];
    const minY = latLon[1];
    const maxX = coordinateLatLonArray[index + 1][0];
    const maxY = coordinateLatLonArray[index + 1][1];

    geoJSONLoc = concatGeoJSON(
      geoJSONLoc,
      RandomGenerator.random(20, { bbox: [minY, minX, maxY, maxX] })
    );
  }
});

// attach random vale property
geoJSONLoc.features.forEach((elem) => {
  elem.properties.value = Math.random() * 30 + 1;
});

var fs = require("fs");
fs.writeFile("GeoJson/geoJSONLoc.json", JSON.stringify(geoJSONLoc), function (
  err
) {
  if (err) {
    console.log(err);
  }
});

geojson2csv("GeoJson/geoJSONLoc.json", "CSV/geoJSONLoc.csv", function (err) {
  if (err) throw err;
});

function concatGeoJSON(g1, g2) {
  if (g1.length == 0) {
    return {
      type: "FeatureCollection",
      features: [...g2.features],
    };
  }
  return {
    type: "FeatureCollection",
    features: [...g1.features, ...g2.features],
  };
}
