const getAccessToken = require('./getaccesstoken').exchangeCodeToAccessToken;
const getUserInfo = require('./getuserinfo').getUserInfo;
const https = require('https');
const http = require('http');
const cookieParser = require('cookie-parser');
const path = require('path');
const express = require('express');
const app = express();

const clientId = process.env.CLIENT_ID;

app.use(cookieParser());

app.set('port', (process.env.PORT || 8000));


app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '/login.html'))
});


app.get('/authorize', (req, res) => {
    const authURL = `https://github.com/login/oauth/authorize?` +
            `client_id=${clientId}&scope=gist`;
    res.redirect(authURL);
});


app.get('/logout', (req, res) => {
    res.clearCookie('id');
    res.clearCookie('username');
    res.clearCookie('avatar_url');
    res.clearCookie('access_token');
    res.redirect('/login');
});


// get access token
app.get('/getaccesstoken', (req, res) => {
    getAccessToken(req.query.code)
        .then((accessToken) => {
            // if access token was acquired succesfully,
            // get user info of the account associated with the token
            getUserInfo(accessToken)
                .then((data) => {
                    res.cookie('id', data.user.id);
                    res.cookie('username', data.user.login);
                    res.cookie('avatar_url', data.user.avatar_url);
                    res.cookie('access_token', accessToken);
                    res.redirect('/');
                }).catch((err) => res.end(err));
        }).catch((err) => res.end(err));
});

app.use((req, res, next) => {
    if(req.cookies['access_token'] !== undefined) {
        next();
    } else {
        res.redirect('/login');
    }
});

app.use(express.static(path.join(__dirname, '/../src/js')))

// redirect all other requests to react-router
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/../src/index.html'))
});


app.listen(app.get('port'), () => console.log('Listening at port ' + app.get('port')));
