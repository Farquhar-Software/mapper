// Convert direction to bearing
export function convertDirectionToBearing(direction) {
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
    direction.degrees + direction.minutes / 60 + direction.seconds / 3600;

  return bearing;
}
