import { useState, useEffect } from 'react';
import Map from '../components/Map';
import {
    getLocations,
    getLocationById,
    createLocation,
    updateLocation,
    deleteLocation
} from '../services/location.service'
import {
    Button,
    TextField,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Dialog,
    DialogTitle,
    DialogActions
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
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
                <List>
                    {locations.map(location => (
                        <ListItem key={location._id} onClick={() => handleClick(location._id)}>
                            <ListItemText primary={location.name} />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="edit" onClick={() => handleUpdateClick(location._id)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton edge="end" aria-label="delete" onClick={() => handleOpenDialog(location)}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
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
                    <div className='form-container'>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                className='location-input'
                                name="name"
                                value={newLocationName}
                                onChange={handleChange}
                                placeholder="Nombre"
                                required
                            />
                            <div className="form-buttons">
                                <Button type="submit">
                                    {selectedLocation ? 'Actualizar ubicación' : 'Crear nueva ubicación'}
                                </Button>
                                <Button type="button" onClick={() => setShowForm(false)}>
                                    Cancelar
                                </Button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
            <div className="map">
                <Map
                    location={{ coordinates: { coordinates: newLocationCoordinates } }}
                    onMarkerDrag={handleMarkerDrag}
                    draggable={showForm}
                />
            </div>
            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
            >
                <DialogTitle>¿Estás seguro de que quieres borrar esta ubicación?</DialogTitle>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>
                        Cancelar
                    </Button>
                    <Button onClick={handleDelete}>
                        Borrar
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openUpdateDialog}
                onClose={() => setOpenUpdateDialog(false)}
            >
                <DialogTitle>¿Estás seguro de que quieres guardar los cambios?</DialogTitle>
                <DialogActions>
                    <Button onClick={() => setOpenUpdateDialog(false)}>
                        Cancelar
                    </Button>
                    <Button onClick={handleUpdateConfirm}>
                        Guardar
                    </Button>
                </DialogActions>
            </Dialog>

        </div >
    );
}

export default MapPage;
