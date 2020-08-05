const axios = require('axios');

export default {
    createUser: userData => {
        return axios.post('/api/users', userData);
    },
    updateUser: updatedData => {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
        return axios.put('/api/exercises', updatedData);
    }
}