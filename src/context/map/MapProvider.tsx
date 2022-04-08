// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import { Map, Marker } from '!mapbox-gl'
import { MapContext } from './MapContext';
import { useReducer, useContext, useEffect } from 'react';
import { mapReducer } from './mapReducer';
import { PlacesContext } from '../';

export interface iMapState {
    isMapReady: boolean;
    map?: Map,
    markers: Marker[];
}

const INITITAL_STATE: iMapState = {
    isMapReady: false,
    map: undefined,
    markers: []
}

interface iProps {
    children: JSX.Element | JSX.Element[];
}

export const MapProvider = ({children}: iProps) => {

    const [state, dispatch] = useReducer(mapReducer , INITITAL_STATE)
    const { places } = useContext(PlacesContext);

    useEffect(() => {
        
        state.markers.forEach( marker => marker.remove() );

        const newMarkers: Marker[] = [];

        for (const place of places) {
            const [lng, lat] = place.center;

            const newMarker = new Marker()
            .setLngLat([lng, lat])
            .addTo( state.map! )

            newMarkers.push( newMarker );
        }

        dispatch({ type: 'setMarkers', payload: newMarkers})

        // Limpiar markers
        // nuevos markadores

    }, [ places ])
    
    

    const setMap = (map: Map) => {

        new Marker({
            color: '#61DAFB'
        })
            .setLngLat( map.getCenter() )
            .addTo( map );

        dispatch({
            type: 'setMap',
            payload: map
        })
    }

  return (
    <MapContext.Provider value={{...state, setMap}}>
        {children}
    </MapContext.Provider>
  )
}
