import {useContext, useState} from 'react';
import { MapContext, PlacesContext } from '../context';
import { Feature } from '../interfaces/places';

export const SearchResult = () => {

    const {places, isLoadingPlaces} = useContext(PlacesContext);

    const { map } = useContext(MapContext)

    const [activeid, setActiveid] = useState('')

    const onPlaceClick = ( place: Feature) => {
        const [lng, lat] = place.center;
        setActiveid( place.id )
        map?.flyTo({
            zoom: 14,
            center: [lng, lat]
        })
    }

    if ( isLoadingPlaces ) {
        return (
            <div>Buscando...</div>
        );
    }
    

  return (
    <ul className='list-group mt-3'>

        {
            places.map(place => (

                <li  onClick={ () => onPlaceClick(place) } key={place.id} className={`pointer list-group-item list-group-item-action ${(activeid === place.id ? 'active-box': '')}`}>

                    <h6> {place.text} </h6>
                    <p className='text-muted' style={{ fontSize: '12px' }}>
                        {place.place_name}
                    </p>

                    <button className='btn btn-outline-primary'>
                        Direcciones
                    </button>
                </li>

            ))
        }

        
    </ul>
  )
}
