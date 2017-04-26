var cookieParser = require('cookie-parser');
var express = require('express');
var exchangeCodeToAccessToken = require('../util/exchangecodetoaccesstoken');
var getUserInfo = require('../util/getuserinfo');
var router = express.Router();

// get accesstoken and user info
router.get('/', (req, res) => {
    exchangeCodeToAccessToken(req.query.code)
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

module.exports = router;
