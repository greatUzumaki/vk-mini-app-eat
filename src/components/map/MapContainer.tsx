import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
const center = { lat: 59.938058, lng: 30.315079 };

export const Map = () => {
  return (
    <MapContainer style={{ height: 500, width: 500 }} zoom={10} center={center}>
      <TileLayer
        url='https://tile.jawg.io/jawg-streets/{z}/{x}/{y}{r}.png?access-token=4rciUHmcwDsK6H4FvucCJVjv5IvdSm2PuimUmyJBgN9LzYr0dYhoCwjb1rioOZcp'
        attribution='<a href=\"https://www.jawg.io\" target=\"_blank\">&copy; Jawg</a> - <a href=\"https://www.openstreetmap.org\" target=\"_blank\">&copy; OpenStreetMap</a>&nbsp;contributors'
      ></TileLayer>
    </MapContainer>
  );
};
