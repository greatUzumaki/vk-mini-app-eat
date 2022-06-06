import { push } from '@cteamdev/router';
import { useAtomValue, useSetAtomState } from '@mntm/precoil';
import { ScreenSpinner } from '@vkontakte/vkui';
import { Icon, LatLngBoundsExpression, LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'react-leaflet-markercluster/dist/styles.min.css';
import MarkerIcon from '../../assets/icons/marker-icon.png';
import { fetching, foodInfo, markersAtom } from '../../store';

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
  popupAnchor: [0, -20],
});

export const Map = () => {
  const setFoodInfo = useSetAtomState(foodInfo);
  const markers = useAtomValue(markersAtom);
  const loading = useAtomValue(fetching);

  return (
    <div style={{ position: 'relative' }}>
      {loading && (
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
        attributionControl={false}
      >
        <TileLayer
          url={`https://tile.jawg.io/jawg-streets/{z}/{x}/{y}{r}.png?access-token=${
            import.meta.env.VITE_MAP_TOKEN
          }`}
          keepBuffer={10}
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
                eventHandlers={{
                  click: () => {
                    setFoodInfo(marker);
                    push('/?modal=modal-page');
                  },
                }}
              >
                <Popup>{marker.name}</Popup>
              </Marker>
            );
          })}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};
