/* eslint-disable react/prop-types */
import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material';


/**
 * Componente de dialogo de confirmación para confirmar acciones, recibe los siguientes props:
 * @param {boolean} open - Indica si el dialogo está abierto o no
 * @param {function} handleClose - Funcion que sirve para cerrar el dialogo
 * @param {string} title - Título del dialogo
 * @param {function} handleConfirm - Funcion que sirve para confirmar la acción
 */
function ConfirmationDialog({ open, handleClose, title, handleConfirm }) {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogActions>
                <Button onClick={handleClose}>
                    Cancelar
                </Button>
                <Button onClick={handleConfirm}>
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmationDialog;