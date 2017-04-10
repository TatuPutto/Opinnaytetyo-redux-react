const https = require('https');
const queryString = require('querystring');

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

function exchangeCodeToAccessToken(code) {
    return new Promise((resolve, reject) => {
        const data = queryString.stringify({
                client_id: clientId,
                client_secret: clientSecret,
                code: code
            });

        const options = {
            hostname: 'github.com',
            path: '/login/oauth/access_token',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(data),
                'Accept': 'application/json'
            }
        };

        const req = https.request(options, (res) => {
            if(res.statusCode !== 200) {
                return reject(res.statusCode + ' ' + res.statusMessage);
            }
            res.setEncoding('utf8');

            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                const parsedData = JSON.parse(data);
                return resolve(parsedData.access_token);
            });
            res.on('error', (err) => reject(err));
        });

        req.write(data);
        req.end();
    });
}

module.exports.exchangeCodeToAccessToken = exchangeCodeToAccessToken;
