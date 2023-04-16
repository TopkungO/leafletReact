import React from 'react'
import { Polyline } from 'react-leaflet'

const RouteairCraft = ({ airCraft }) => {

    const position=airCraft && airCraft.map((item,index)=>[item.latitude,item.longitude])

  return (
    airCraft && <Polyline positions={position} pathOptions={{color:"red"}} />
  );
};

export default RouteairCraft