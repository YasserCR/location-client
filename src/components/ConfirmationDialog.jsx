/* eslint-disable react/prop-types */
import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material';

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