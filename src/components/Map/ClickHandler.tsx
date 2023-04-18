import { LeafletMouseEvent } from 'leaflet';
import { useMapEvents } from 'react-leaflet';

type Props = {
  onClick?: (event: LeafletMouseEvent) => void;
};

const ClickHandler = ({ onClick }: Props) => {
  const map = useMapEvents({
    click: (event) => {
      map.locate();

      onClick && onClick(event);
    },
  });

  return null;
};

export default ClickHandler;
