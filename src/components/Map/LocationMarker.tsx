import { LatLngExpression } from 'leaflet';
import React, { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';

import * as locationService from '@/components/Map/location.service';
import Marker from '@/components/Map/Marker';

const LocationMarker = () => {
  const [position, setPosition] = useState<LatLngExpression>();

  const map = useMap();

  useEffect(() => {
    map.locate().on('locationfound', function (e) {
      if (!e.latlng) {
        return;
      }

      locationService.setLocation(e.latlng);
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom(), { animate: false });
    });
  }, [map]);

  if (!position) {
    return null;
  }

  return position && <Marker position={position} text="Buradasın!" />;
};

export default LocationMarker;
