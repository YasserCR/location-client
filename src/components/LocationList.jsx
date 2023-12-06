/* eslint-disable react/prop-types */
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function LocationList({ locations, handleClick, handleUpdateClick, handleOpenDialog }) {
    return (
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
    );
}

export default LocationList;