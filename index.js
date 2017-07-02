var express = require('express');
var app = express();
var calendarCtrl = require('./scheduler.js');
app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

// 1-Render main page
app.get('/index', function (req, res) {
    res.sendFile( __dirname + "/views/pages/" + "index.html" );
})

app.get("/dayy", function(req, res) {
  // Render the 'game' template and pass in the gameid to the template
  res.render('day', {day: 12})
});

// 2-Webservice

// Webservice URLs

// Controller to initialize objects
var scheduleController = require('./scheduler.js');

// Month
app.get('/month/:year/:month', function (req, res) {
    var year = req.params.year;
    var month = req.params.month;
    var month_obj = scheduleController.month(year, month);
    res.send(JSON.stringify(month_obj));
})

// Day
/*app.get('/day/:year/:month/:day', function (req, res) {
    var year = req.params.year;
    var month = req.params.month;
    var day = req.params.day;
    var day_obj = scheduleController.day(year, month, day);
    res.send(JSON.stringify(day_obj));
})*/

// Day
app.get('/year/:year', function (req, res) {
    var year = req.params.year;
    var year_obj = scheduleController.year(year);
    res.send(JSON.stringify(year_obj));
})

app.get('/dia/:dia', function (req, res) {
    res.sendFile( __dirname + "/views/pages/" + "index.html", {dia: req.params.dia} );
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

