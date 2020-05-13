const RandomGenerator = require("random-points-generator");
var geojson2csv = require("geojson2csv");

// -----> Example Coordinate array to generate random geo point
var coordinateLatLonArray = [[-344.451394, 38.205401],
[-344.438269, 38.207018],
[-344.452766, 38.203379],
[-344.438698, 38.204053],
[-344.454139, 38.201828],
[-344.441186, 38.201559],
[-344.457656, 38.199671],
[-344.442644, 38.199739],
[-344.46246, 38.197312],
[-344.443588, 38.197244],
[-344.466062, 38.195289],
[-344.444617, 38.19475],
[-344.466834, 38.193806],
[-344.444789, 38.193132],
[-344.468293, 38.192458],
[-344.44599, 38.191244],
[-344.468979, 38.190772],
[-344.447362, 38.187604],
[-344.472753, 38.182749],
[-344.469751, 38.188682],
[-344.449764, 38.183558],
[-344.472753, 38.181468],
[-344.451308, 38.181603],
[-344.472753, 38.17958],
[-344.441186, 38.17931],
[-344.469923, 38.177894],
[-344.44599, 38.177085],
[-344.466491, 38.175804],
[-344.449078, 38.175737],
[-344.463146, 38.174388],
[-344.451136, 38.174051],
[-344.459543, 38.172837],
[-344.452766, 38.172972],
[-344.459028, 38.172028],
[-344.469751, 38.180794],
[-344.441186, 38.181805],
[-344.455426, 38.180389],
[-344.440156, 38.180592],
[-344.449078, 38.182682],
[-344.440242, 38.182817],
[-344.451565, 38.185177],
[-344.438612, 38.184098],
[-344.450279, 38.186188],
[-344.436811, 38.185918],
[-344.447105, 38.186862],
[-344.437326, 38.187064],
[-344.433122, 38.187064],
[-344.434752, 38.187536],
[-344.431664, 38.188008],
[-344.433723, 38.188817],
[-344.430206, 38.189087],
[-344.433208, 38.189829],
[-344.428147, 38.190301],
[-344.429863, 38.19057],
[-344.427375, 38.191379],
[-344.428919, 38.191716],
[-344.426775, 38.192458],
[-344.428833, 38.192728],
[-344.426431, 38.193132],
[-344.430635, 38.193267],
[-344.430635, 38.193267],
[-344.428662, 38.195424],
[-344.430377, 38.196705],
[-344.428061, 38.196368]
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
