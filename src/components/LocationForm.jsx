/* eslint-disable react/prop-types */
import { TextField, Button } from '@mui/material';

function LocationForm({ newLocationName, handleChange, handleSubmit, setShowForm, selectedLocation }) {
    return (
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
    );
}

export default LocationForm;