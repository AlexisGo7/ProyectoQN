import axios from 'axios';

// Crea una instancia de Axios con la URL base
const instance = axios.create({
    baseURL: 'https://fakestoreapi.com',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default instance;