var express = require("express");
var session = require("express-session");
var SequelizeStore = require('connect-session-sequelize')(session.Store);

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;
var allRoutes = require('./controllers');

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(session(
  { 
    secret: "keyboard cat", 
    store: new SequelizeStore({
      db:db.sequelize
    }),
    resave: false, 
    saveUninitialized: false,
    cookie : {
      maxAge:2*60*60*1000
    }
  }));


app.use('/',allRoutes);


db.sequelize.sync({ force: false}).then(function() {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
  });

