import { exec } from "child_process";
import fs from "fs";

const dir = fs.readdirSync("output_tiles");
const mbtiles = dir.reduce((total, val) => total += ` output_tiles/${val}`, '');

exec(`tile-join --no-tile-size-limit -o merged.mbtiles --force${mbtiles}`);