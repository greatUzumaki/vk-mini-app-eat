import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-markercluster/dist/styles.min.css';
import { LatLngBoundsExpression, LatLngExpression, Icon } from 'leaflet';
import MarkerIcon from '../../assets/icons/marker-icon.png';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { DefaultApi, Configuration, Result } from '../../api';
import { setErrorSnackbar } from '../../hooks';

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
  const [markers, setMarkers] = useState<Result[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const API = new DefaultApi(
        new Configuration({
          accessToken: import.meta.env.VITE_API_TOKEN,
        })
      );
      try {
        let i = 1;
        const markersArr: Array<Result> = [];

        while (true) {
          const { data } = await API.datasets143VersionsLatestData570Get(
            i,
            100
          );
          i++;
          data && markersArr.push(...(data.results as Array<Result>));
          if (!data.next) break;
        }

        setMarkers(markersArr);
      } catch {
        setErrorSnackbar('Fetch error, check console');
      }
    };

    fetch();
  }, []);

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

      {markers.length === 0 ? (
        <p>Загрузка..</p>
      ) : (
        <MarkerClusterGroup
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
      )}
    </MapContainer>
  );
};
