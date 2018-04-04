//// Modules /////////////////////////////////////////
var express = require('express');
var dotenv = require('dotenv').config();
var handlebars = require('express-handlebars');
var httpRoutes = require('./routes/httpRoutes');
var apiRoutes = require('./routes/apiRoutes');
var database = require('./models');

var passport = require('passport');
var googleAuth = require('./auth/googleAuth');

var session = require('express-session');
var FileStore = require('session-file-store')(session);

//// Configure Application ///////////////////////////

var PORT = process.env.PORT || 8080;
var app = express();

var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');

app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// from session file store


// app.use(session({
//     store: new FileStore(),
//     secret: 'keyboard cat',
//     resave: true, saveUninitialized:true
// }));

// // For Passport
// // app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret

// app.use(passport.initialize());

// app.use(passport.session()); // persistent login sessions

// Routing

googleAuth(passport);
app.use(passport.initialize());

app.get('/auth/google', function (a, b, next) {
    next();
});

app.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: 'http://localhost:8080/',
    }),
    (req, res) => { 
        null;
        res.send("cool").status(200).end();
    }
);

app.get('/auth/google/auth', function (req, res, next) {
    if (!req.user) { // Not already logged in, probably okay to try to hit the oauth provider
        return next();
    }
    res.redirect('/'); // Already logged in, send them where I want them after the callback anyway.
}, passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile']
}));



app.use(express.static('public'));
app.use(httpRoutes);
app.use('/api', apiRoutes);

//// Start Server ////////////////////////////////////

database.sequelize.sync({ force: true }).then(function () {
    console.log("Database connected.")
    // for testing purposes
    database.user.create({ firstname: "tom", lastname: "my", username: "tommy", about: "sup", email: "a@b.com", password: "dog", last_login: Date(), status: 'active' }).then(r => console.log(r)).catch(e => console.log(e));

}).catch(err => {
    console.log("Failed to connect to database.", err);
});
var server = app.listen(PORT, function () {
    console.log("Listening on port " + PORT);
});    
