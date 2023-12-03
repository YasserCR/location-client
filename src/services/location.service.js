export const getLocations = () => {
    return fetch('http://localhost:3000/api/locations')
        .then(response => response.json())
}

export const getLocationById = (id) => {
    return fetch(`http://localhost:3000/api/location/${id}`)
        .then(response => response.json())
}

export const createLocation = (location) => {
    return fetch('http://localhost:3000/api/location', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(location)
    })
        .then(response => response.json())
}

export const deleteLocation = (id) => {
    return fetch(`http://localhost:3000/api/location/${id}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                return response.text().then(text => text ? JSON.parse(text) : {})
            } else {
                throw new Error('Error deleting location');
            }
        });
}

export const updateLocation = (id, data) => {
    return fetch(`http://localhost:3000/api/location/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
}
