var express = require('express');
var router = express.Router();
var clientId = process.env.CLIENT_ID;

// redirect user to github to authorize the application
router.get('/', (req, res) => {
    var authURL = `https://github.com/login/oauth/authorize?` +
            `client_id=${clientId}&scope=gist`;
    res.redirect(authURL);
});

module.exports = router;
