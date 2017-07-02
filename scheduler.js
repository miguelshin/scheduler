var Year = require('./classes/year.js').year;
var Month = require('./classes/month.js').month;
var Day = require('./classes/day.js').day;

var year = function(year_id) {
    var year = new Year(year_id);
    var months = [];
    for(var month_id = 1; month_id <= Year.numMonths; month_id++) {
        months[month_id-1] = month(year_id, month_id);
    }
    year.months = months;
    return year;
}

var month = function(year_id, month_id) {
    var month = new Month(month_id, new Year(year_id)); 
    month.value = month.monthValue();
    month.numDays = month.getNumDays();

    console.log("days:");
    var days = [];
    for(var day_id = 1; day_id <= month.numDays; day_id++) {
        days[day_id-1] = day(year_id, month_id, day_id);
    }
    month.days = days;
    month.daysHTML = month.renderMonthDaysHTML();

    return month;
}

var day = function(year_id, month_id, day_id) {
    // TODO: borrar elemento days vacío
    var day = new Day(day_id, new Month(month_id), new Year(year_id));
    day.value = day.dayValue();

    return day;
}

module.exports.year = year;
module.exports.month = month;
module.exports.day = day;