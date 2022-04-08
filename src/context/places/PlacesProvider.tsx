import { PlacesContext } from "./PlacesContext";
import { useReducer } from 'react';
import { placesReducer } from "./placesReducer";
import { useEffect } from 'react';
import { getUserLocation } from "../../helpers";
import { searchApi } from "../../apis";
import { iPlacesResponse, Feature } from '../../interfaces/places';

export interface iPlacesState {
    isLoading: boolean;
    userLocation?: [number, number],
    isLoadingPlaces: boolean;
    places: Feature[];
}

const INITAILA_STATE:iPlacesState = {
    isLoading:  true,
    userLocation: undefined,
    isLoadingPlaces: false,
    places: []
}

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const PlacesProvider = ({ children }: Props) => {

  const [state, dispatch] = useReducer(placesReducer, INITAILA_STATE);

  useEffect( () => {
    getUserLocation().then( lngLat => {
      console.log('state', state.userLocation)
      dispatch( { type: 'setUserLocation', payload: lngLat} )
    });
  }, []);

  const searchPlacesByTerm = async( query: string): Promise<Feature[]> => {

    if ( query.length === 0 ) {
      dispatch({ type: 'setPlaces', payload: []})
      return [];
    }
    // if ( state.userLocation ) throw new Error("No hay Ubicacion del usuario");
    

    dispatch({type: 'setLoadingPlaces'});

    console.log('state.userLocation', state.userLocation)
    const resp = await searchApi.get<iPlacesResponse>(`/${ query }.json`, {
      params: {
        proximity: state?.userLocation && state.userLocation.join(',')
      }
    });

    dispatch({ type: 'setPlaces', payload: resp.data.features})

    return resp.data.features;

  }

  return (
    <PlacesContext.Provider value={{...state, searchPlacesByTerm}}>

      { children }

    </PlacesContext.Provider>
  )
}
