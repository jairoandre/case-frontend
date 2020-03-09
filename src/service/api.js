import axios from 'axios'

const api = {

    filterCases(callback) {
        axios.get("/api/case").then((response) => {
            callback(response.data);
        });
    },

};

export default api;