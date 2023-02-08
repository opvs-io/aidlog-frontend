import React, { useMemo } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';

import 'leaflet/dist/leaflet.css';

import LocationMarker from '@/components/Map/LocationMarker';
import * as locationService from '@/components/Map/location.service';
import Marker from '@/components/Map/Marker';

type Props = {
  locations: Locations[];
};

export type Locations = {
  location: LatLngExpression;
  name: string;
};

const Map = ({ locations }: Props) => {
  const center = useMemo(() => {
    const lastLocation = locationService.getLocation();

    if (lastLocation) {
      return lastLocation;
    }

    return [36.4202214, 36.238724] as LatLngExpression;
  }, []);

  return (
    <MapContainer
      className="h-96 bg-red-200"
      zoom={9}
      scrollWheelZoom={false}
      center={center}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <LocationMarker />

      {locations.map((location) => (
        <Marker
          key={location.name}
          position={location.location}
          text={location.name}
        />
      ))}
    </MapContainer>
  );
};

export default Map;
