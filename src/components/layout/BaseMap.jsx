import React from "react";

import { LayersControl, TileLayer } from "react-leaflet";

const BaseMap = () => {
  return (
    <>
      <LayersControl.BaseLayer name="ปกติ" checked>
        <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </LayersControl.BaseLayer>

      <LayersControl.BaseLayer name="ถนน">
        <TileLayer url="https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png" />
      </LayersControl.BaseLayer>

      <LayersControl.BaseLayer name="ดาวเทียม">
        <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
      </LayersControl.BaseLayer>
    </>
  );
};

export default BaseMap;
