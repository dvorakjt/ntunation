const axios = require('axios');

export default {
    createUser: userData => {
        return axios.post('/api/users', userData);
    },
    updateUser: updatedData => {
        return axios.put('/api/exercises', updatedData);
    }
}