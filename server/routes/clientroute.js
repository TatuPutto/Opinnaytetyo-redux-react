var path = require('path');
var cookieParser = require('cookie-parser');
var express = require('express');
var router = express.Router();

/*
router.use(cookieParser());

// check if user is logged in
router.use((req, res, next) => {
    if(req.cookies['access_token'] !== undefined) {
        next();
    } else {
        res.redirect('/login');
    }
});*/

// redirect all other requests client app
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/', 'index.html'));
});



module.exports = router;
