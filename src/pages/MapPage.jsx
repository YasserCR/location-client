import { useState, useEffect } from 'react';
import Map from '../components/Map';
import {
    getLocations,
    getLocationById,
    createLocation,
    updateLocation,
    deleteLocation
} from '../services/location.service'

function MapPage() {

    const defaultCoordinates = [19.18095, -96.1429];
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [newLocationName, setNewLocationName] = useState('');
    const [newLocationCoordinates, setNewLocationCoordinates] = useState(defaultCoordinates);

    useEffect(() => {
        getLocations().then(setLocations);
    }, []);

    const resetMap = () => {
        setSelectedLocation(null);
        setNewLocationCoordinates(defaultCoordinates);
    };

    const handleDelete = async (id) => {
        await deleteLocation(id);
        const updatedLocations = locations.filter(location => location._id !== id);
        setLocations(updatedLocations);
    };

    const handleUpdateClick = async (id) => {
        const location = await getLocationById(id);
        setNewLocationName(location.name);
        setNewLocationCoordinates(location.coordinates.coordinates);
        setSelectedLocation(location);
        setShowForm(true);
    };

    const handleClick = async (id) => {
        const location = await getLocationById(id);
        setSelectedLocation(location);
        setNewLocationCoordinates(location.coordinates.coordinates);
    };

    const handleMarkerDrag = (latLng) => {
        setNewLocationCoordinates([latLng.lat, latLng.lng]);
    };

    const handleChange = (event) => {
        setNewLocationName(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let updatedLocations;
        if (selectedLocation) {
            const updatedLocation = await updateLocation(selectedLocation._id, {
                name: newLocationName,
                coordinates: {
                    type: "Point",
                    coordinates: newLocationCoordinates
                }
            });
            updatedLocations = locations.map(
                location => location._id === updatedLocation._id ? updatedLocation : location
            );
        } else {
            const createdLocation = await createLocation({
                name: newLocationName,
                coordinates: {
                    type: "Point",
                    coordinates: newLocationCoordinates
                }
            });
            updatedLocations = [...locations, createdLocation];
        }
        setLocations(updatedLocations);
        setNewLocationName('');
        setNewLocationCoordinates(defaultCoordinates);
        setShowForm(false);
    };

    return (
        <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
            <div style={{ flex: 1 }}>
                <h1>Lista de ubicaciones guardadas</h1>
                <ul>
                    {locations.map(location => (
                        <li key={location._id} onClick={() => handleClick(location._id)}>
                            {location.name}
                            <button onClick={() => handleUpdateClick(location._id)}>Actualizar</button>
                            <button onClick={() => handleDelete(location._id)}>Eliminar</button>
                        </li>
                    ))}
                </ul>
                <button onClick={() => {
                    setShowForm(!showForm);
                    if (!showForm) {
                        resetMap();
                        setNewLocationName('');
                    }
                }}>
                    {showForm ? 'Cancelar' : 'Agregar nueva ubicación'}
                </button>
                {showForm && (
                    <form onSubmit={handleSubmit}>
                        <input
                            name="name" value={newLocationName}
                            onChange={handleChange}
                            placeholder="Nombre"
                            required
                        />
                        <button type="submit">
                            {selectedLocation ? 'Actualizar ubicación' : 'Crear nueva ubicación'}
                        </button>
                    </form>
                )}
            </div>
            <div style={{ flex: 1 }}>
                <Map
                    location={{ coordinates: { coordinates: newLocationCoordinates } }}
                    onMarkerDrag={handleMarkerDrag}
                    draggable={showForm}
                />
            </div>
        </div>
    );
}

export default MapPage;
