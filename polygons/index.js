import fs from "fs";
import { exec } from "child_process";

const input = JSON.parse(fs.readFileSync("../export_free_trips.json"));
const zoomTripIds = JSON.parse(fs.readFileSync("../output-tripids.json"));

for (const zoom in zoomTripIds) {
    const tripIds = zoomTripIds[zoom];

    const zoomFeatures = input.features.filter(f => f.properties.poiType == undefined && tripIds.includes(f.properties.tripId));
    // console.log(zoom, zoomFeatures);

    if (!fs.existsSync("output")) {
        fs.mkdirSync("output");
    }

    if (!fs.existsSync("output_tiles")) {
        fs.mkdirSync("output_tiles");
    }

    fs.writeFileSync(`output/${zoom}.json`, JSON.stringify({
        type: 'FeatureCollection',
        features: zoomFeatures
    }));

    exec(`tippecanoe -z${zoom} -Z${zoom} --layer=trips -o output_tiles/${zoom}.mbtiles output/${zoom}.json`, { cwd: process.cwd() }, (err, stdout, stderr) => {
        console.log(err, stdout, stderr);
    });
}