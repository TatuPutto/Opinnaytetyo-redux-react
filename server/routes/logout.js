var express = require('express');
var router = express.Router();

// clear cookies and redirect back to login page
router.get('/', (req, res) => {
    res.clearCookie('id');
    res.clearCookie('username');
    res.clearCookie('avatar_url');
    res.clearCookie('access_token');
    res.redirect('/');
});

module.exports = router;
