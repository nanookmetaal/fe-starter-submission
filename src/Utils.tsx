/**
 * Load previously generated GeoJSON objects from localStorage.
 * @returns {Array} List of parsed GeoJSON objects.
 */
export function loadShapes() {
  const keys = Object.keys(localStorage);
  const shapesMap = new Map();
  keys
    .filter((key) => key.endsWith(".geojson"))
    .forEach((key) => {
      // making assumption here that localconfig will contain well formed geojson pairs
      const value = localStorage.getItem(key)!;
      const jsonObject = JSON.parse(value);
      shapesMap.set(key, jsonObject);
    });

  return shapesMap;
}
