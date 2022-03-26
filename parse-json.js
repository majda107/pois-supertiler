import fs from "fs";
import readline from "readline";
import events from "events";

async function process() {
    const rl = readline.createInterface({
        input: fs.createReadStream('pois/atm.geojson'),
        crlfDelay: Infinity
    });

    let foundFeatures = false;
    rl.on('line', line => {

        if (foundFeatures) {
            try {
                if (line.endsWith(',')) line = line.slice(0, -1);

                const feature = JSON.parse(line);
                console.log(feature);
            } catch { }
        }

        if (line.includes("features")) {
            foundFeatures = true;
        }
    });

    await events.once(rl, 'close');
}

process();