
import { useRef, ChangeEvent } from 'react';
import {useContext} from 'react';
import { PlacesContext } from '../context';
import { SearchResult } from './SearchResult';

export const SearchBar = () => {

    const {searchPlacesByTerm} = useContext( PlacesContext )

    

    const debounceRef = useRef<NodeJS.Timeout>();

    const onQueryChanged = ( event: ChangeEvent<HTMLInputElement> ) => {

        if ( debounceRef.current ) {
            clearTimeout( debounceRef.current );
        } 

        debounceRef.current = setTimeout( () => {
            // Buscar o ejecutar algo
            console.log('debounce value', event.target.value)
            searchPlacesByTerm(event.target.value)
        }, 1000)
    }

  return (
    <div className='search-container'>
        <input type="text"  className='form-control' placeholder='Buscar Lugar ...' onChange={ onQueryChanged }/>
        <SearchResult />
    </div>
  )
}
