import { createContext } from 'react';
import { Map } from 'mapbox-gl';

export interface iMapContextProps {
    isMapReady: boolean;
    map?: Map,

    // metodos

    setMap: (map: Map) => void;
}


export const MapContext = createContext( {} as iMapContextProps)