import { push } from '@cteamdev/router';
import { useAtomState, useAtomValue, useSetAtomState } from '@mntm/precoil';
import { ScreenSpinner } from '@vkontakte/vkui';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useState } from 'react';
import {
  MapContainer,
  Marker,
  TileLayer,
  Tooltip,
  useMapEvents,
} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'react-leaflet-markercluster/dist/styles.min.css';
import MarkerIcon from '../../assets/icons/marker-icon.png';
import { fetching, foodInfo, mapInfo, markersAtom } from '../../store';

/** Координаты центра СПБ */
const center: L.LatLngExpression = { lat: 59.938058, lng: 30.315079 };

/** Ограничения карты */
const maxBoundsCoords: L.LatLngBoundsExpression = [
  [60.303665, 29.327367],
  [59.574302, 30.999731],
];

const markerIcon = new L.Icon({
  iconUrl: MarkerIcon,
  iconSize: [42, 42],
  className: 'fade',
  tooltipAnchor: [20, 0],
});

const CustomClusterIcon = (cluster: L.MarkerCluster) => {
  const markers = cluster.getAllChildMarkers();
  const markersCount = markers.length;
  const html = '<div class="circle">' + markersCount + '</div>';
  return L.divIcon({
    html: html,
    className: 'mycluster',
    iconSize: L.point(32, 32),
  });
};

/**
 * Хэндлер для зума, чтобы скрывать и показывать тултипы в зависимости от уровня зума
 * */
function MapEventHandler({
  setZoomLevel,
}: {
  setZoomLevel: (zoomLevel: number) => void;
}) {
  const mapEvents = useMapEvents({
    zoomend: () => {
      setZoomLevel(mapEvents.getZoom());
    },
  });

  return null;
}

export const Map = () => {
  const setFoodInfo = useSetAtomState(foodInfo);
  const [map, setMapInfo] = useAtomState(mapInfo);

  const markers = useAtomValue(markersAtom);
  const loading = useAtomValue(fetching);

  const [zoomLevel, setZoomLevel] = useState(5);

  return (
    <div style={{ position: 'relative', zIndex: -1 }}>
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
        ref={(r) => r?.addEventListener('zoomend', () => alert('awd'))}
        minZoom={12}
        maxBounds={maxBoundsCoords}
        style={{ height: '100vh', width: '100%' }}
        zoom={map?.zoom || 11}
        center={map?.coords || center}
        maxBoundsViscosity={1.0}
        attributionControl={false}
      >
        <TileLayer
          url={`https://tile.jawg.io/jawg-streets/{z}/{x}/{y}{r}.png?access-token=${
            import.meta.env.VITE_MAP_TOKEN
          }`}
          keepBuffer={8}
        ></TileLayer>

        <MapEventHandler setZoomLevel={setZoomLevel} />

        <MarkerClusterGroup
          maxClusterRadius={50}
          polygonOptions={{ color: 'orange' }}
          disableClusteringAtZoom={15}
          spiderLegPolylineOptions={{
            weight: 1.8,
            color: '#222',
            opacity: 0.8,
          }}
          iconCreateFunction={CustomClusterIcon}
        >
          {markers.map((marker) => {
            return (
              <Marker
                key={marker.oid}
                riseOnHover
                riseOffset={999}
                position={marker.coord as L.LatLngExpression}
                icon={markerIcon}
                eventHandlers={{
                  click: () => {
                    setFoodInfo(marker);
                    setMapInfo({
                      zoom: zoomLevel,
                      coords: marker.coord as L.LatLngExpression,
                    });
                    push('/foodinfo');
                  },
                }}
              >
                {(zoomLevel > 16 || (map?.coords && map?.zoom > 16)) && (
                  <Tooltip className='fade' permanent>
                    {marker.name}
                  </Tooltip>
                )}
              </Marker>
            );
          })}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};
