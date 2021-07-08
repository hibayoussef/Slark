const axios = require('axios');
// const baseURL = 'https://slark-backend.herokuapp.com' ;
export default {
    createSpace: (data) => {
        const formData = new FormData();
        formData.append('_workspace', data._workspace);
        formData.append('name', data.name);
        return axios({
            // url: `${baseURL}/space`,
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            },
            data: formData,
        });
    },
};