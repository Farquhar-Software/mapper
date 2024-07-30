import * as turf from '@turf/turf';

export function shape(formData) {
    // {
    //     lat: lat.value,
    //     long: long.value,
    //     bearings: bearings.value.map(b => ({
    //       direction1: b.direction1,
    //       degrees: b.degrees,
    //       minutes: b.minutes,
    //       seconds: b.seconds,
    //       direction2: b.direction2,
    //       distance: b.distance,
    //       unit: b.unit
    //     }
    // }
    const { lat, long } = formData;
    const results = []

    let origin = turf.point([lat, long]);
    for (let i = 0; i < formData.bearings.length; i++) {
        const nextBearing = formData.bearings[i]
        const {distance, unit, degrees, minutes, seconds, direction2} = nextBearing
        const bearing = convertDirectionToBearing({
            cardinal: direction2,
            degrees,
            minutes,
            seconds
        })
        const destination = turf.destination(origin, distance, bearing, { units: unit });
        const {geometry: { coordinates }} = destination
        results.push(coordinates)
        origin = turf.point(coordinates)
    }

    return results.push(results[0])

}


function convertDirectionToBearing(direction) {
    let bearing = 0;
  
    console.log(direction);
  
    // Convert cardinal direction to degrees
    const cardinalMap = {
      N: 0,
      NE: 45,
      E: 90,
      SE: 135,
      S: 180,
      SW: 225,
      W: 270,
      NW: 315,
    };
  
    bearing = cardinalMap[direction.cardinal];
  
    // Adjust bearing based on degrees, minutes, and seconds
    bearing +=
      direction.degrees + 
      direction.minutes / 60 + 
      direction.seconds / 3600;
  
    return bearing;
  }