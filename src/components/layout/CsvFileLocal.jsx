import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import { Marker,Popup } from "react-leaflet";
import "./style.css"

const CsvFileLocal = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch("./Airport.csv");
    const text = await res.text();

    const json = Papa.parse(text, { header: true }).data;

    const filterData = json.filter(
      (item) => item.long !== "" && item.lat !== " "
    );
    setData(filterData);
  };

  return data
    ? data.map((item, index) => (
        <Marker position={[item.lat, item.long]} key={index}>
          <Popup className="my-popup">
            <h2>{item["Name Thai"]}</h2>
            <img src={item["Image URL"]} />
          </Popup>
        </Marker>
      ))
    : null;
};

export default CsvFileLocal;
