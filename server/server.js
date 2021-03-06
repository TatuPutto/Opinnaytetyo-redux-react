var path = require('path');
var express = require('express');
var login = require('./routes/login');
var logout = require('./routes/logout');
var authorize = require('./routes/authorize');
var getAccessToken = require('./routes/getaccesstoken');
var clientRoute = require('./routes/clientroute');
var app = express();
var port = process.env.PORT || 3000;

app.use(require('express-useragent').express());
app.use(function (req, res, next) {
    if(req.useragent.isSafari) {
        res.end('Safari is not currently supported!');
    }
    next();
});

app.use('/public', express.static(path.join(__dirname, '/public')));
app.use('/login', login);
app.use('/authorize', authorize);
app.use('/logout', logout);
app.use('/getaccesstoken', getAccessToken);
app.use('*', clientRoute);

app.listen(port, () => console.log(`Listening at port ${port}`));
