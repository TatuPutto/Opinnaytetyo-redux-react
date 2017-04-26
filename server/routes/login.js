var path = require('path');
var express = require('express');
var router = express.Router();

// send login page
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'login.html'));
});

module.exports = router;
