const xml2js = require('xml2js');
const fs = require('fs');

function remover(element, input, output = "output.gpx") {
    
    if (input.substring(input.length - 4) !== '.gpx' ||
        output.substring(output.length - 4) !== '.gpx') {
        throw TypeError("please specify input and output as gpx file, eg. 'file.gpx'");
        }
    
    const parser = new xml2js.Parser({ attrkey: "$" });
    let xml_string = fs.readFileSync(input, "utf8");
    var gpxFile = {};

    parser.parseString(xml_string, function (error, result) {
        for (var i in result) {
            gpxFile[i] = result[i]
        }
    });


    if (typeof element !== "string") {
        throw TypeError("please specify gpx element to be remove as string, eg 'time'");
    }
        
    //remove time key in object 
    for (var x in gpxFile.gpx.trk) {
        for (var k in gpxFile.gpx.trk[x].trkseg) {
            for (var j in gpxFile.gpx.trk[x].trkseg[k].trkpt) {
                delete gpxFile.gpx.trk[x].trkseg[k].trkpt[j][element]
            }
        }
    }

    //save time removed object as gpx file
    var builder = new xml2js.Builder();
    var xml = builder.buildObject(gpxFile);
    fs.writeFile(output, xml, (err) => {
        if (err)
            console.log('there is an output builder error:')
            console.log(err);
    })

    console.log(`The element '${element}' has been removed from the '${input}' file and been saved as '${output}' file`)

}

remover('time', '2022_RoadTripWithMaddySanLucarToMurcia.gpx')
