const xml2js = require('xml2js');
const fs = require('fs');
const { time } = require('console');
const { default: test } = require('node:test');
const parser = new xml2js.Parser({ attrkey: "$" });

// importing gpx and saving as object
let xml_string = fs.readFileSync("africaAggregate.gpx", "utf8");
var gpxFile = {};

parser.parseString(xml_string, function (error, result) {
    for (var i in result) {
        gpxFile[i] = result[i]
    }
});

this is a test

//remove time key in object 
for (var x in gpxFile.gpx.trk) {
    for (var k in gpxFile.gpx.trk[x].trkseg) {
        for (var j in gpxFile.gpx.trk[x].trkseg[k].trkpt) {
            delete gpxFile.gpx.trk[x].trkseg[k].trkpt[j].time
        }
    }
}

//save time removed object as gpx file
var builder = new xml2js.Builder();
var xml = builder.buildObject(gpxFile);
fs.writeFile('Output.gpx', xml, (err) => {
    if (err)
        console.log(err);
})