/**
 * Created by xottab on 3/12/15.
 */
var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var i18n = require("i18next");

var routes = require('./routes/index');
var scratch = require("./routes/scratch");

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon_new.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/locales",express.static(path.join(__dirname, 'locales')));

app.use(i18n.handle);

i18n.init({
    preload: ['ru', 'en'],
    useCookie: false,
    //debug: true,
    detectLngQS: 'lang',
    lng: "en"
}, function (t) {
   // console.log(i18n.t("main.run"));
});
i18n.setLng('ru', function(t) { });

i18n.registerAppHelper(app);

app.use('/', routes);
app.use("/scratch", scratch);
i18n.serveClientScript(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;

