
var mongoose = require('mongoose');
var express = require('express');
var User = require('./models/user_model');
var bodyparser = require('body-parser');
var moment = require('moment');
var passport = require('passport');
var path = require( 'path' );
var cookieParser = require( 'cookie-parser' );
var expressValidator = require('express-validator');
var http = require('http');
var util = require( 'util' );

var app = express();
app.set('appSecret', process.env.SECRET || 'changethischangethis!');
app.use(passport.initialize());
require('./lib/passport_strat')(passport);

var server = app.listen(process.env.PORT || 3000);

var io = require('socket.io')(server);
app.set('socketio', io);

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());


var myMakeAlbumTwo = require('./routes/album_routes');


mongoose.connect(process.env.MONG_URI || 'mongodb://localhost:27017/mr_music');


var router = express.Router();
app.use(express.static(__dirname + '/app'));

var userRoutes = new (require('./routes/user_routestwo'))(app,passport,router);

app.use('/MakeAlbum', myMakeAlbumTwo);

app.use('/', router);


module.exports = app;


