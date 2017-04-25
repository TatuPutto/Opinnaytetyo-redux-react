var https = require('https');
var queryString = require('querystring');

var clientId = process.env.CLIENT_ID;
var clientSecret = process.env.CLIENT_SECRET;

function exchangeCodeToAccessToken(code) {
    return new Promise((resolve, reject) => {
        var data = queryString.stringify({
                client_id: clientId,
                client_secret: clientSecret,
                code: code
            });

        var options = {
            hostname: 'github.com',
            path: '/login/oauth/access_token',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(data),
                'Accept': 'application/json'
            }
        };

        var req = https.request(options, (res) => {
            if(res.statusCode !== 200) {
                return reject(res.statusCode + ' ' + res.statusMessage);
            }
            res.setEncoding('utf8');

            var data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                var parsedData = JSON.parse(data);
                resolve(parsedData.access_token);
            });
            res.on('error', (err) => reject(err));
        });

        req.write(data);
        req.end();
    });
}

module.exports = exchangeCodeToAccessToken;
