import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

/** Координаты центра СПБ */
const center = { lat: 59.938058, lng: 30.315079 };

export const Map = () => {
  return (
    <MapContainer style={{ height: 500, width: 500 }} zoom={10} center={center}>
      <TileLayer
        url={`https://tile.jawg.io/jawg-streets/{z}/{x}/{y}{r}.png?access-token=${
          import.meta.env.VITE_MAP_TOKEN
        }`}
      ></TileLayer>
    </MapContainer>
  );
};
