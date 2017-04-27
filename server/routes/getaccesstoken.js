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
                    var expires = {maxAge: (7 * 24 * 60 * 60 * 1000)};
                    res.cookie('id', data.user.id, expires);
                    res.cookie('username', data.user.login, expires);
                    res.cookie('avatar_url', data.user.avatar_url, expires);
                    res.cookie('access_token', accessToken, expires);
                    res.redirect('/');
                }).catch((err) => res.end(err));
        }).catch((err) => res.end(err));
});

module.exports = router;
