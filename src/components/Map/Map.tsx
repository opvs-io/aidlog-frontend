import React, { useMemo } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { LatLngExpression, LeafletMouseEvent } from 'leaflet';

import 'leaflet/dist/leaflet.css';

import LocationMarker from '@/components/Map/LocationMarker';
import * as locationService from '@/components/Map/location.service';
import Marker from '@/components/Map/Marker';
import classNames from 'classnames';
import ClickHandler from '@/components/Map/ClickHandler';

type Props = {
  locations: Locations[];
  className?: string;
  onClick?: (event: LeafletMouseEvent) => void;
};

export type Locations = {
  location: LatLngExpression;
  name: string;
};

const Map = ({ locations, className, onClick }: Props) => {
  const center = useMemo(() => {
    const lastLocation = locationService.getLocation();

    if (lastLocation) {
      return lastLocation;
    }

    return [36.4202214, 36.238724] as LatLngExpression;
  }, []);

  return (
    <MapContainer
      className={classNames('h-96', className)}
      zoom={9}
      scrollWheelZoom={false}
      center={center}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ClickHandler onClick={onClick} />
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
