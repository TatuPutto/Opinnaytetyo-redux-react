const getAccessToken = require('./get-access-token').exchangeCodeToAccessToken;
const https = require('https');
const http = require('http');
const cookieParser = require('cookie-parser');
const path = require('path');
const express = require('express');
const app = express();

const clientId = process.env.CLIENT_ID;
console.log(clientId);
app.use(cookieParser());

app.use(express.static(__dirname + '/../src/js'))

app.set('views', __dirname);
app.engine('html', require('ejs').renderFile);

console.log(__dirname);


app.get('/login', (req, res) => {
    const authURL = `https://github.com/login/oauth/authorize?` +
            `client_id=${clientId}&scope=gist`;
    res.redirect(authURL);
});

app.get('/logout', (req, res) => {
    res.clearCookie('access_token');
    res.redirect('/login');
});


app.get('/getaccesstoken', (req, res) => {
    getAccessToken(req.query.code)
        .then((accessToken) => {
            res.cookie('access_token', accessToken);
            res.redirect('/index');
        }).catch((err) => res.end(err));
});

app.get('*', (req, res) => {
    //res.render('index.html');
    res.sendFile(path.join(__dirname, '/../src/index.html'))
});


app.listen('8000', () => {
    console.log('Listening at port 8000');
});
