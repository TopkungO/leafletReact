import React,{useEffect,useState} from 'react'
import Papa from "papaparse"

const FirmNasa = ({ setFirm }) => {

    useEffect(()=>{
        loadFirm()
    },[])

    const loadFirm = async()=>{
        const url =
          "https://firms.modaps.eosdis.nasa.gov/api/country/csv/b5e598a2a00cf8316b8327a7e9e4af05/VIIRS_SNPP_NRT/THA/5/2023-04-01";
        const response =await fetch(url)
        const text =await response.text()
        const jsonData =await Papa.parse(text,{header:true}).data
        setFirm(jsonData);
    }
  return null;
};

export default FirmNasa