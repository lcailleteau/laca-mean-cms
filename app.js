// Express application requirements.
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// The mongoDb instance configuration.
require('./backend/database/mongo-db-connector');

// The database models.
require('./backend/models/site');
require('./backend/models/user');
require('./backend/models/template');
require('./backend/models/page-model');
require('./backend/models/homepage');
require('./backend/models/menu');
require('./backend/models/wiki');
require('./backend/models/html-fragment');

// The routes.
var routesFrontendWeb = require('./frontend_web/routes');
var routesFrontendRest = require('./frontend_rest/routes');

// Express application.
var app = express();

// Express view engine parameters.
app.set('views', path.join(__dirname, 'frontend_web', 'views'));
app.set('view engine', 'ejs');

// Connect.js middleware flow.
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

///public/frontend_angular/modules/admin/
/*
app.use('/public/frontend_angular/modules/admin/',
  express.static(path.join(__dirname, 'public/frontend_angular/modules/admin/index.html')));
  */

app.use('/public', express.static(path.join(__dirname, 'public')));

/*
app.get('/public/*', function(request, response, next) {
  //response.sendfile(__dirname + '/index.html');
  response.sendfile('public/frontend_angular/modules/admin/index.html');
});
*/

/*
app.get('/:site/admin*', function(request, response, next) {
  //response.sendfile(__dirname + '/index.html');
  response.sendfile('frontend_angular/modules/admin/index.html');
});
*/

app.use('/angular', express.static(path.join(__dirname, 'frontend_angular/public')));

app.use('/admin', express.static(path.join(__dirname, 'frontend_angular/modules/laca-admin')));

app.get('/admin*', function(request, response, next) {
  //response.sendfile(__dirname + '/index.html');
  //response.sendfile('frontend_angular/modules/admin/index.html');
  response.sendFile(path.join(__dirname, 'frontend_angular/modules/laca-admin/index.html'));
});


// Let's add our own routes.
app.use('/', routesFrontendWeb);
app.use('/api', routesFrontendRest);





// app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// Exports the express app.
module.exports = app;
