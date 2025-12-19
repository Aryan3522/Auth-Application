const calculateDistance = (
  startLatitude,
  startLongitude,
  destinationLatitude,
  destinationLongitude
) => {
  const degreesToRadians = (degrees) => (degrees * Math.PI) / 180;

  const earthRadiusInKilometers = 6371;

  const latitudeDifference = degreesToRadians(
    destinationLatitude - startLatitude
  );
  const longitudeDifference = degreesToRadians(
    destinationLongitude - startLongitude
  );

  const haversineFormulaValue =
    Math.sin(latitudeDifference / 2) * Math.sin(latitudeDifference / 2) +
    Math.cos(degreesToRadians(startLatitude)) *
      Math.cos(degreesToRadians(destinationLatitude)) *
      Math.sin(longitudeDifference / 2) *
      Math.sin(longitudeDifference / 2);

  const angularDistance =
    2 *
    Math.atan2(
      Math.sqrt(haversineFormulaValue),
      Math.sqrt(1 - haversineFormulaValue)
    );

  const distanceInKilometers = earthRadiusInKilometers * angularDistance;

  return distanceInKilometers;
};

module.exports = calculateDistance;
