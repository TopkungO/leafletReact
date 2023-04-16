import React from "react";
import { GeoJSON } from "react-leaflet";
import data from "../data/province.json";

const Povince = () => {
  const geoStyle = (feature) => {
    const region = feature.properties.REGION6;
    if (region == "ภาคกลาง") {
      return {
        weight: 1,
        color: "red",
        fillColor: "red",
        fillOpacity: 0.3,
      };
    } else if (region == "ภาคตะวันออกเฉียงเหนือ") {
      return {
        weight: 1,
        color: "green",
        fillColor: "green",
        fillOpacity: 0.3,
      };
    } else if (region == "ภาคตะวันตก") {
      return {
        weight: 1,
        color: "yellow",
        fillColor: "yellow",
        fillOpacity: 0.3,
      };
    } else if (region == "ภาคใต้") {
      return {
        weight: 1,
        color: "#B2A4FF",
        fillColor: "#B2A4FF",
        fillOpacity: 0.3,
      };
    } else {
      return {
        weight: 1,
        color: "blue",
        fillColor: "#B9F3E4",
        fillOpacity: 0.3,
      };
    }
  };

  const handleClickFeature =(e)=>{
    const layer=e.target
    const prop =e.target.feature.properties

    let popupContent =""
    for(const [key,val] of Object.entries(prop)){

      let link = "https://mpics.mgronline.com/pics/Images/552000004396401.JPEG";

      if (key == "REGION6") {
        popupContent += "<img style='max-width:100%' src='" + link + "'/>";
      } else {
        popupContent += key + ":" + val + "<br/>";
      }
      
    }

    layer.bindPopup(popupContent);
  }
  const handleEachFeature = (feature, layer) => {
    layer.bindTooltip(feature.properties.ADM1_TH,{
      direction:"center"
    })
    layer.on({
      "click":handleClickFeature
    })
  };
  return (
    data && (
      <GeoJSON 
        data={data} 
        style={geoStyle} 
        onEachFeature={handleEachFeature} />
    )
  );
};

export default Povince;
