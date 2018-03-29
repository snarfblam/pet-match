//// Modules /////////////////////////////////////////
var express = require('express');
var dotenv = require('dotenv');
var handlebars = require('express-handlebars');
var httpRoutes = require('./routes/httpRoutes');
var database = require('./models');

//// Configure Application ///////////////////////////

var PORT = process.env.PORT || 8080;
var app = express();
app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routing
app.use(express.static('public'));
app.use(httpRoutes);

//// Start Server ////////////////////////////////////

database.sequelize.sync({force: true}).then(function () {
    console.log("Database connected.")
}).catch(err => {
    console.log("Failed to connect to database.", err);
});
var server = app.listen(PORT, function () {
    console.log("Listening on port " + PORT);
});    
