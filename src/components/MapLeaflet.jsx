import React, { useState, useRef } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  Tooltip,
  LayersControl,
  LayerGroup,
} from "react-leaflet";
import L from "leaflet";
//layout
import BaseMap from "./layout/BaseMap";
import CsvFileLocal from "./layout/CsvFileLocal";
import AircraftCSV from "./layout/AircraftCSV";
import RouteairCraft from "./layout/RouteairCraft";
import Povince from "./layout/povince";
import FirmNasa from "./layout/FirmNasa";
import FormInsert from "./layout/FormInsert";

//iconMarker
import "leaflet-rotatedmarker";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import iconAir from "leaflet/dist/images/air3.png";
import iconFirm from "leaflet/dist/images/fire.gif";

//css
import "bootstrap/dist/css/bootstrap.min.css";
import "./layout/map.css";

//widgets
import LeafletDrawControl from "./widgets/LeafletDrawControl";
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12.5, 20.5],
});
L.Marker.prototype.options.icon = DefaultIcon;

let airMarker = L.icon({
  iconUrl: iconAir,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

let firmMarker = L.icon({
  iconUrl: iconFirm,
  iconSize: [10, 10],
  iconAnchor: [5, 5],
});


const MapLeaflet = () => {
  const mapRef = useRef();
  const [airCraft, setAircraft] = useState(null);
  const [firm, setFirm] = useState(null);
  const [data, setData] = useState({
    title: "",
    latitude: "",
    longitude: "",
    icon: "",
    size: "",
  });

  function fitTo(objects) {
    const bounds = objects.reduce(function (acc, cur) {
      return acc.extend([cur.latitude, cur.longitude]);
    }, L.latLngBounds());
    mapRef.current.fitBounds(bounds);
  }

  const headleDrawingCreated = (geojson) => {
    console.log(geojson);
  };


  const onChangeData = (e) => {
    setData((state) => ({ ...state, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e)=>{
    e.preventDefault()
    console.log(data);
  }

  return (
    <div>
      <FirmNasa setFirm={setFirm} />
      <AircraftCSV setAircraft={setAircraft} fitTo={fitTo} />
      <div className="row">
        <div className="col-8">
          <MapContainer
            ref={mapRef}
            style={{ width: "100%", height: "100vh" }}
            center={[13, 100]}
            zoom={6}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <LayersControl position="topright">
              <BaseMap />
              <LayersControl.Overlay name="airport">
                <LayerGroup>
                  <CsvFileLocal />
                </LayerGroup>
              </LayersControl.Overlay>

              <LayersControl.Overlay name="AirCraft">
                <LayerGroup>
                  {airCraft &&
                    airCraft.map((item, index) => (
                      <Marker
                        key={index}
                        icon={airMarker}
                        rotationAngle={item.bearing}
                        position={[item.latitude, item.longitude]}
                      >
                        <Tooltip>angle:{item.angle}</Tooltip>
                      </Marker>
                    ))}
                  <RouteairCraft airCraft={airCraft} />
                </LayerGroup>
              </LayersControl.Overlay>

              <LayersControl.Overlay name="Povince">
                <LayerGroup>
                  <Povince />
                </LayerGroup>
              </LayersControl.Overlay>

              <LayersControl.Overlay name="firm Nasa">
                <LayerGroup>
                  {firm &&
                    firm.map((item, index) => (
                      <Marker
                        key={index}
                        icon={firmMarker}
                        position={[item.latitude, item.longitude]}
                      >
                        <Tooltip>
                          {Object.keys(item).map((key) => (
                            <div key={key}>
                              <b>{key}: </b>
                              {item[key]}
                            </div>
                          ))}
                        </Tooltip>
                      </Marker>
                    ))}
                </LayerGroup>
              </LayersControl.Overlay>

              <LayersControl.Overlay name="Form Data" checked>
                <LayerGroup>
                  <FormInsert
                    data={data}
                    setData={setData}
                    DefaultIcon={DefaultIcon}
                  />
                </LayerGroup>
              </LayersControl.Overlay>
            </LayersControl>

            <LeafletDrawControl onDrawCreated={headleDrawingCreated} />
          </MapContainer>
        </div>
        <div className="col-2">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input
                name="title"
                type="text"
                className="form-control"
                onChange={onChangeData}
              />
            </div>

            <div className="form-group">
              <label>latitude</label>
              <input
                name="latitude"
                type="text"
                className="form-control"
                value={data.latitude}
              />
            </div>

            <div className="form-group">
              <label>longitude</label>
              <input
                name="longitude"
                type="text"
                className="form-control"
                value={data.longitude}
              />
            </div>

            <div className="form-group">
              <label>icon</label>
              <input
                name="icon"
                type="text"
                className="form-control"
                onChange={onChangeData}
              />
            </div>

            <div className="form-group">
              <label>size</label>
              <input
                type="range"
                className="form-range"
                min="1"
                max="100"
                step="1"
                name="size"
                onChange={onChangeData}
              />
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MapLeaflet;
