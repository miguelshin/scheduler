const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

function Day(id, month, year) {
    this.id = id;
    this.value = null;
    this.month = month;
    this.year = year;
    this.dayValue = function() {
        return days[new Date(this.year.id, this.month.id - 1, this.id).getDay()];
    }

}

Object.defineProperty(Day, 'days', {
    value: days,
    writable : false,
    enumerable : true,
    configurable : false
});


module.exports.day = Day;