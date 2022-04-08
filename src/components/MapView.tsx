import { useContext, useRef, useLayoutEffect } from 'react';
import { Loading } from './Loading';
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import {Map} from '!mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import { PlacesContext, MapContext } from '../context';


export const MapView = () => {

  const {isLoading, userLocation} = useContext(PlacesContext);
  const { setMap } = useContext(MapContext)
  const mapDiv = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if ( !isLoading ) {
      const map = new Map({
        container: mapDiv.current!, // container ID
        style: 'mapbox://styles/mapbox/dark-v10', // style URL
        center: userLocation, // starting position [lng, lat]
        zoom: 13 // starting zoom
        });
        setMap(map);
    }
  }, [ isLoading ])

  if ( isLoading ) {
    return( <Loading /> )
  }

  return (
    <div ref={ mapDiv } style={{height:'100vh', width: '100%'}}>
        {
          userLocation?.join(',')
        }
    </div>
  )
}
