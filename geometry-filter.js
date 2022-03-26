// export function filterPoints(featureCollection) {
//     const points = featureCollection.features.filter(feature => feature.geometry.type == 'Point');

//     return {
//         type: "FeatureCollection",
//         features: points
//     };
// }
// 

export const pointsGeometryFilter = f => f.geometry.type == 'Point';