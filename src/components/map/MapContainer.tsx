import { useAtomValue } from '@mntm/precoil';
import { ScreenSpinner } from '@vkontakte/vkui';
import { Icon, LatLngBoundsExpression, LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'react-leaflet-markercluster/dist/styles.min.css';
import MarkerIcon from '../../assets/icons/marker-icon.png';
import { markersAtom } from '../../store';

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
  const markers = useAtomValue(markersAtom);

  return (
    <div style={{ position: 'relative' }}>
      {markers.length === 0 && (
        <ScreenSpinner
          style={{
            position: 'absolute',
            zIndex: 999,
            backgroundColor: 'rgba(0,0,0,0.3)',
          }}
          size='large'
        />
      )}

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

        <MarkerClusterGroup
          polygonOptions={{ color: 'orange' }}
          disableClusteringAtZoom={15}
          spiderLegPolylineOptions={{
            weight: 1.8,
            color: '#222',
            opacity: 0.8,
          }}
        >
          {markers.map((marker) => {
            return (
              <Marker
                key={marker.oid}
                riseOnHover
                riseOffset={999}
                position={marker.coord as LatLngExpression}
                icon={markerIcon}
              ></Marker>
            );
          })}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};
