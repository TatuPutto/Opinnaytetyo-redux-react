const https = require('https');

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

function getUserInfo(accessToken) {
    return new Promise((resolve, reject) => {
        const encodedAuthInfo = new Buffer(
                clientId + ':' + clientSecret).toString('base64');

        const options = {
            hostname: 'api.github.com',
            path: `/applications/${clientId}/tokens/${accessToken}`,
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Basic ' + encodedAuthInfo,
                'user-agent': 'opinnaytetyo'
            }
        };

        https.get(options, (res) => {
            if(res.statusCode !== 200) {
                return reject(res.statusCode + ' ' + res.statusMessage);
            }

            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                const parsedData = JSON.parse(data);
                return resolve(parsedData);
            });
            res.on('error', (err) => reject(err));
        }).on('error', (err) => reject(err));
    });
}

module.exports.getUserInfo = getUserInfo;
