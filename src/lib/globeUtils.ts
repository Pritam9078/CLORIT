/**
 * Converts geographic coordinates to 3D Cartesian coordinates.
 * 
 * @param lat Latitude in degrees
 * @param lng Longitude in degrees
 * @param radius Radius of the sphere
 * @returns [x, y, z] position array
 */
export const latLngToVector3 = (lat: number, lng: number, radius: number): [number, number, number] => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  // Standard Three.js coordinates (Y up)
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return [x, y, z];
};
