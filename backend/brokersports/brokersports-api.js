const axios = require('axios');


const brokerSportsApiURL = 'http://nl.brokersports.club/api/v2';
const brokerSportsApiKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2NmJkZDhkY2QxYjQ2NDA2ZDRhMWI1MDEiLCJpYXQiOjE3MjM3MTgxNDksImV4cCI6MTgxODMyNjE0OX0.yd3y_dNKFND6xh1M9fmjhQC2pHkBewIqFrG-bth8ZM4';

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

const brokerSportsApiRequest = (urlPath = '', isObject = false) => {


    return new Promise((resolve, reject) => {
        console.log(`======= Calling API ${brokerSportsApiURL}${urlPath}`)
        axios.get(`${brokerSportsApiURL}${urlPath}`, {
            headers: {
                "Authorization": `Bearer ${brokerSportsApiKey}`,
                "Accept": "application/json"
            }
        })
            .then(response => {
                if (isObject || Array.isArray(response.data)) {
                    resolve(response.data);
                } else {
                    resolve([]);
                }
            })
            .catch(error => {
                console.error("Error:", error);
                reject(error);
            });

    })

}


module.exports = brokerSportsApiRequest;
