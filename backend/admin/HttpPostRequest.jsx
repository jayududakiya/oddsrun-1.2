
import axios from 'axios';

const API_URL = window.location.origin + '/api/v1';
export const BASE_URL = window.location.origin + '/'

const HttpPostRequest = async (path, data = {}) => {

    const headers = { 'Authorization': 'UnAuthorized' };

    return new Promise((resolve, reject) => {

        axios.post(`${API_URL}${path}`, data, { headers: headers })
            .then(function (response) {

                try {

                    if (response.data.code !== 200) {
                        throw new Error(response.data.data);
                    }

                    resolve(response.data.data);

                } catch (error) {
                    throw new Error(error.message);
                }

            })
            .catch(function (error) {
                reject(error.message);
            });

    })

}

export default HttpPostRequest;
