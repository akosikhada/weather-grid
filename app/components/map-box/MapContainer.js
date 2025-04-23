"use client";

import React, { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function FlyToActiveCity({ activeCityCords }) {
  const map = useMap();

  useEffect(() => {
    if (activeCityCords && map) {
      const zoomLev = 13;
      const flyToOptions = {
        duration: 1.5,
        noMoveStart: true,
      };

      map.setView(
        [activeCityCords.lat, activeCityCords.lon],
        zoomLev,
        flyToOptions,
      );
    }
  }, [activeCityCords?.lat, activeCityCords?.lon, map]);

  return null;
}

function MapContainerComponent({ activeCityCords }) {
  const center = useMemo(() => [activeCityCords.lat, activeCityCords.lon], []);

  const mapKey = useMemo(() => "map-container", []);

  return (
    <MapContainer
      key={mapKey}
      center={center}
      zoom={13}
      scrollWheelZoom={false}
      className="m-4 rounded-lg"
      style={{ height: "calc(100% - 2rem)", width: "calc(100% - 2rem)" }}
      zoomControl={false}
      attributionControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      <FlyToActiveCity activeCityCords={activeCityCords} />
    </MapContainer>
  );
}

export default MapContainerComponent;
