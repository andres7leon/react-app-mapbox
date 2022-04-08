import { createContext } from 'react';
import { Feature } from '../../interfaces/places';

export interface iPlacesContextProps {
    isLoading: boolean;
    userLocation?: [number, number],
    isLoadingPlaces: boolean;
    places: Feature[];
    // metodos
    searchPlacesByTerm: (query: string) => Promise<Feature[]>
}


export const PlacesContext = createContext<iPlacesContextProps>({} as iPlacesContextProps);
