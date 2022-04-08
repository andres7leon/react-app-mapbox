import React from 'react';
import ReactDOM from 'react-dom';
import { MapsApp } from './MapsApp';

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
 
mapboxgl.accessToken = 'pk.eyJ1IjoiYW5kcmVzbGVvbiIsImEiOiJjbDFsNXdjazUwNmxvM2VxdWJqYTIyNTdwIn0.eGx9fg0Zlq05zZfD-2sEyg';

if (!navigator.geolocation) {
  alert('Lo sentimos no tienes opcion de geolocalizacion');
  throw new Error("Tu navegador no tiene opcion de Geolocalizacion");
}


ReactDOM.render(
  <React.StrictMode>
    <MapsApp />
  </React.StrictMode>,
  document.getElementById('root')
);

