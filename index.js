import supertiler from "supertiler-next";
import geojsonVt from "geojson-vt";

// import { pointsGeometryFilter } from "./geometry-filter";

// export const pointsGeometryFilter = f => f.geometry.type == 'Point' && f.properties.poiType == 'trip-start';
export const pointsGeometryFilter = f => f.geometry.type == 'Point';

function getFeatureType(feature) {
    switch (feature.geometry.type) {
        case 'Point':
            return 1;
        case 'MultiLineString':
            return 2;
        case 'Polygon':
            return 3;
    }
}

export const tripsGeometryMapper = (cleanFeatures, features, { x, y, z }) => {
    const tripIds = cleanFeatures.map(f => f.tags.tripId);
    const newFeatures = features
        // .filter(f => tripIds.includes(f.properties.tripId) && (f.properties.poiType == undefined || f.properties.poiType != 'trip-start'))
        .filter(f => tripIds.includes(f.properties.tripId) && (f.properties.poiType == undefined))
        .map(f => {
            // if (f.properties.tripId == '239836' && f.geometry.type == 'Polygon') {
            // console.log("TRIP", f, f.geometry.coordinates);
            // }

            // if (f.properties.poiType == 'trip-end') {
            //     console.log("L", f.geometry.coordinates.length);

            //     return {
            //         geometry: f.geometry.coordinates,
            //         tags: f.properties,
            //         type: 1
            //     }
            // }

            const vt = geojsonVt(f);
            let tile = vt.getTile(z, x, y);

            if (tile && tile.features && tile.features.length >= 1) {
                return tile.features[0];
            }


            // return {
            //     geometry: deepclone(f.geometry.coordinates),
            //     tags: f.properties,
            //     type: getFeatureType(f)
            // }
        })
        .filter(f => f != undefined);

    return newFeatures;
}

supertiler({
    // input: 'export_free_trips.json',
    input: 'pois/restaurant.geojson',
    output: 'pois/restaurant.mbtiles',
    maxZoom: 13,
    logPerformance: true,
    includeUnclustered: true,
    layer: 'pois',
    // inputGeometryFilter: pointsGeometryFilter,
    // geometryMapper: tripsGeometryMapper,
    reduce: (acc, props) => {
        if (acc?.done) return;

        acc = { ...props };
        acc.done = true;
    },

    minPoints: 4,
    storeClusterExpansionZoom: true,
    radius: 40
}).then((success) => {
    console.log("SUPERTILER SUCCESS", success);
}, (err) => {
    console.log("SUPERTILER ERROR", err);
});