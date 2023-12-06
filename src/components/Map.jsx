/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/map.css';

/** 
 * Componente que muestra un mapa con una ubicación, recibe los siguientes props:
 * @param {object} location - Objeto con los datos de la ubicación
 * @param {function} onMarkerDrag - Función que se ejecuta cuando se arrastra el marcador
 * @param {boolean} draggable - Indica si el marcador es arrastrable o no
*/
function Map({ location, onMarkerDrag, draggable }) {
    const mapRef = useRef(null);
    const markerRef = useRef(null);

    /**
     * Se ejecuta cuando se monta el componente y cada vez que cambia la ubicación
     * Si el mapa no existe, lo crea y lo guarda en el ref
     * Si el mapa existe, lo actualiza
     * Si el marcador existe, lo elimina
     * Crea un marcador con la ubicación y lo guarda en el ref
     * Agrega un evento al marcador para que se ejecute la función onMarkerDrag cuando se arrastre
     */
    useEffect(() => {
        const [lat, lng] = location.coordinates.coordinates;

        if (!mapRef.current) {
            mapRef.current = L.map('map', {
                center: [lat, lng],
                zoom: 14,
                layers: [
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    }),
                ],
            });
        } else {
            mapRef.current.setView([lat, lng], 13);
        }

        if (markerRef.current) {
            mapRef.current.removeLayer(markerRef.current);
        }

        markerRef.current = L.marker([lat, lng], { draggable }).addTo(mapRef.current);
        markerRef.current.on('dragend', function (event) {
            onMarkerDrag(event.target.getLatLng());
        });
    }, [location, onMarkerDrag, draggable]);

    return <div id="map" className='map-render'></div>;
}

export default Map;