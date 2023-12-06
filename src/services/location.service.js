export const getLocations = () => {
    return fetch('https://theplaces.online/api/locations')
        .then(response => response.json())
}

export const getLocationById = (id) => {
    return fetch(`https://theplaces.online/api/location/${id}`)
        .then(response => response.json())
}

export const createLocation = (location) => {
    return fetch('https://theplaces.online/api/location', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(location)
    })
        .then(response => response.json())
}

export const deleteLocation = (id) => {
    return fetch(`https://theplaces.online/api/location/${id}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                // text => text ? JSON.parse(text) : {} es una forma de hacer un JSON.parse
                //es necesario porque si no hay nada en el body, el response.json() da error
                return response.text().then(text => text ? JSON.parse(text) : {})
            } else {
                throw new Error('Error deleting location');
            }
        });
}

export const updateLocation = (id, data) => {
    return fetch(`https://theplaces.online/api/location/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
}
