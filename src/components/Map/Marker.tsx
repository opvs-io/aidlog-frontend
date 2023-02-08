import { icon } from 'leaflet';
import React from 'react';
import { Marker as LeafletMarker, MarkerProps, Popup } from 'react-leaflet';

type Props = MarkerProps & {
  text: string;
};

const Marker = ({ text, ...props }: Props) => {
  const markerIcon = icon({
    iconUrl: '/marker.png',
    iconSize: [20, 32],
  });

  return (
    <LeafletMarker icon={markerIcon} {...props}>
      {Boolean(text) && <Popup>{text}</Popup>}
    </LeafletMarker>
  );
};

export default Marker;
