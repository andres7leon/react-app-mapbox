import axios from 'axios';


const searchApi = axios.create({
    baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
    params: {
        limit: 5,
        lenguage: 'es',
        access_token: 'pk.eyJ1IjoiYW5kcmVzbGVvbiIsImEiOiJjbDFsNXdjazUwNmxvM2VxdWJqYTIyNTdwIn0.eGx9fg0Zlq05zZfD-2sEyg'
    }
});


export default searchApi;

// /bogota.json?limit=7&proximity=ip&types=place%2Cpostcode%2Caddress&language=es&access_token=YOUR_MAPBOX_ACCESS_TOKEN