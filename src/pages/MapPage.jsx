import { useState, useEffect } from 'react';
import Map from '../components/Map';
import LocationForm from '../components/LocationForm';
import LocationList from '../components/LocationList';
import ConfirmationDialog from '../components/ConfirmationDialog';
import {
    getLocations,
    getLocationById,
    createLocation,
    updateLocation,
    deleteLocation
} from '../services/location.service'
import {
    Button,
} from '@mui/material';
import '../styles/map-page.css';


function MapPage() {

    const defaultCoordinates = [19.18095, -96.1429];
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [newLocationName, setNewLocationName] = useState('');
    const [newLocationCoordinates, setNewLocationCoordinates] = useState(defaultCoordinates);
    const [openDialog, setOpenDialog] = useState(false);
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false);

    useEffect(() => {
        getLocations().then(setLocations);
    }, []);

    const resetMap = () => {
        setSelectedLocation(null);
        setNewLocationCoordinates(defaultCoordinates);
    };

    const handleOpenDialog = (location) => {
        setSelectedLocation(location);
        setOpenDialog(true);
    };

    const handleDelete = async () => {
        await deleteLocation(selectedLocation._id);
        const updatedLocations = locations.filter(location => location._id !== selectedLocation._id);
        setLocations(updatedLocations);
        resetMap();
        setOpenDialog(false);
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
        setOpenUpdateDialog(true);
    };

    const handleUpdateConfirm = async () => {
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
            setNewLocationCoordinates(createdLocation.coordinates.coordinates);
        }
        setLocations(updatedLocations);
        setNewLocationName('');
        setShowForm(false);
        setOpenUpdateDialog(false);
    };

    return (
        <div className="container">
            <div className="list">
                <h2>Ubicaciones guardadas</h2>
                <LocationList
                    locations={locations}
                    handleClick={handleClick}
                    handleUpdateClick={handleUpdateClick}
                    handleOpenDialog={handleOpenDialog}
                />
                {!showForm && (
                    <Button onClick={() => {
                        setShowForm(true);
                        resetMap();
                        setNewLocationName('');
                    }}>
                        {'Agregar nueva ubicación'}
                    </Button>
                )}
                {showForm && (
                    <LocationForm
                        newLocationName={newLocationName}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        setShowForm={setShowForm}
                        selectedLocation={selectedLocation}
                    />
                )}
            </div>
            <div className="map">
                <Map
                    location={{ coordinates: { coordinates: newLocationCoordinates } }}
                    onMarkerDrag={handleMarkerDrag}
                    draggable={showForm}
                />
            </div>
            <ConfirmationDialog
                open={openDialog}
                handleClose={() => setOpenDialog(false)}
                title="¿Estás seguro de que quieres borrar esta ubicación?"
                handleConfirm={handleDelete}
            />
            <ConfirmationDialog
                open={openUpdateDialog}
                handleClose={() => setOpenUpdateDialog(false)}
                title="¿Estás seguro de que quieres guardar los cambios?"
                handleConfirm={handleUpdateConfirm}
            />

        </div >
    );
}

export default MapPage;
