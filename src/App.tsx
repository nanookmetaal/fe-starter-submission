import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import * as turf from "@turf/turf";
import "./App.css";
import FileUpload from "./UploadGeoJSON";
import { FeatureCollection } from "geojson";
import { loadShapes } from "./Utils";
import NavBar from "./NavBar";

mapboxgl.accessToken = ""

function App() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [lng, setLng] = useState(149);
  const [lat, setLat] = useState(-35);
  const [currentShapeId, setCurrentShapeId] = useState("");
  const [zoom, setZoom] = useState(11);

  const shapesMap = loadShapes();

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current as HTMLElement,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });

    // update map coordinates
    map.current.on("move", () => {
      setLng(parseFloat(map.current!.getCenter().lng.toFixed(4)));
      setLat(parseFloat(map.current!.getCenter().lat.toFixed(4)));
      setZoom(parseFloat(map.current!.getZoom().toFixed(2)));
    });
  }, [lng, lat, zoom, shapesMap]);

  // render the selected shape on map and move map view to it
  const setShape = (id: string, geojson: FeatureCollection) => {
    // add shape to existing shapesList if not present
    shapesMap.set(id, geojson);

    // remove previous layer
    if (
      map.current?.getSource(currentShapeId) &&
      map.current?.getLayer(currentShapeId)
    ) {
      map.current?.removeLayer(currentShapeId);
      map.current?.removeSource(currentShapeId);
    }

    setCurrentShapeId(id);

    map.current?.addSource(id, {
      type: "geojson",
      data: geojson,
    });

    map.current?.addLayer({
      id: id,
      type: "fill",
      source: id,
      paint: {
        "fill-color": "#ff0088",
        "fill-opacity": 0.6,
      },
    });

    // calculate shape boundary
    const shapeBounds = turf.bbox(geojson);
    const boundsArray = [
      [shapeBounds[0], shapeBounds[1]],
      [shapeBounds[2], shapeBounds[3]],
    ] as mapboxgl.LngLatBoundsLike;

    // center map on the current shape
    map.current?.fitBounds(boundsArray, {
      padding: 30,
    });
  };

  const handleSavedLocationClick = (id: string, savedLocation: FeatureCollection) => {
    console.log(`Button for ${id} clicked`);
    setShape(id, savedLocation);
  };

  return (
    <div className="root">
      <h1 className="greeting">Nature Intel Application</h1>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>

      <div ref={mapContainer} className="map-container" />
      <NavBar locations={shapesMap} onLocationClick={handleSavedLocationClick} />

      <p className="text">Upload shape (GeoJSON file format)</p>
      <FileUpload onUpload={setShape} />
    </div>
  );
}

export default App;
