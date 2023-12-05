/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/map.css';

function Map({ location, onMarkerDrag, draggable }) {
    const mapRef = useRef(null);
    const markerRef = useRef(null);

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