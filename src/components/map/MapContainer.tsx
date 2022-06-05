import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLngBoundsExpression, LatLngExpression, Icon } from 'leaflet';
import MarkerIcon from '../../assets/icons/marker-icon.png';

/** Координаты центра СПБ */
const center: LatLngExpression = { lat: 59.938058, lng: 30.315079 };

/** Ограничения карты */
const maxBoundsCoords: LatLngBoundsExpression = [
  [60.303665, 29.327367],
  [59.574302, 30.999731],
];

const markerIcon = new Icon({
  iconUrl: MarkerIcon,
  iconSize: [42, 42],
});

export const Map = () => {
  return (
    <MapContainer
      minZoom={12}
      maxBounds={maxBoundsCoords}
      style={{ height: '100vh', width: '100%' }}
      zoom={11}
      center={center}
      maxBoundsViscosity={1.0}
      inertiaDeceleration={5000}
      // worldCopyJump={true}
      attributionControl={false}
    >
      <TileLayer
        url={`https://tile.jawg.io/jawg-streets/{z}/{x}/{y}{r}.png?access-token=${
          import.meta.env.VITE_MAP_TOKEN
        }`}
      ></TileLayer>

      <Marker
        riseOnHover
        riseOffset={999}
        position={center}
        icon={markerIcon}
      ></Marker>
    </MapContainer>
  );
};
