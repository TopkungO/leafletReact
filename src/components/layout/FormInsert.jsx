import React from "react";
import { Marker, useMapEvent } from "react-leaflet";
import * as L from "leaflet"




const FormInsert = ({ data, setData ,DefaultIcon}) => {

  let clickMarker = data.icon
    ? L.icon({
        iconUrl: data.icon,
        iconSize: [data.size, data.size],
        iconAnchor: [data.size / 2, data.size / 2],
      })
    : DefaultIcon;

  const map = useMapEvent({
    dblclick(e) {
      map.flyTo(e.latlng);
      setData((state) => ({
        ...state,
        latitude: e.latlng.lat,
        longitude: e.latlng.lng,
      }));
    },
  });

  return (
    data.latitude &&
    data.longitude && (
      <Marker
        icon={clickMarker}
        position={[data.latitude, data.longitude]}
      ></Marker>
    )
  );
};

export default FormInsert;
