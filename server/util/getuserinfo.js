var https = require('https');

var clientId = process.env.CLIENT_ID;
var clientSecret = process.env.CLIENT_SECRET;

function getUserInfo(accessToken) {
    return new Promise((resolve, reject) => {
        // encode auth info to base64
        var encodedAuthInfo = new Buffer(
                `${clientId}:${clientSecret}`).toString('base64');

        var options = {
            hostname: 'api.github.com',
            path: `/applications/${clientId}/tokens/${accessToken}`,
            headers: {
                'Accept': 'application/json',
                'Authorization': `Basic ${encodedAuthInfo}`,
                'user-agent': 'opinnaytetyo'
            }
        };

        https.get(options, (res) => {
            if(res.statusCode !== 200) {
                return reject(res.statusCode + ' ' + res.statusMessage);
            }

            var data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => resolve(JSON.parse(data)));
            res.on('error', (err) => reject(err));
        }).on('error', (err) => reject(err));
    });
}

module.exports = getUserInfo;
