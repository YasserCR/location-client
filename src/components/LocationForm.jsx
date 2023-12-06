/* eslint-disable react/prop-types */
import { TextField, Button } from '@mui/material';

/**
 * Componente con formulario para crear o actualizar ubicaciones, recibe los siguientes props:
 * @param {string} newLocationName - Nombre de la ubicación
 * @param {function} handleChange - Función que se ejecuta cuando cambia el valor del input de nombre
 * @param {function} handleSubmit - Función que se ejecuta cuando se envía el formulario
 * @param {function} setShowForm - Función que sirve para cerrar el formulario
 * @param {object} selectedLocation - Objeto con los datos de la ubicación seleccionada
 */

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