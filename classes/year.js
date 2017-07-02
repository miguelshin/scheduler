const numMonths = 12

function Year(id) {
    this.id = id
    this.months = [];
}

Object.defineProperty(Year, 'numMonths', {
    value: numMonths,
    writable : false,
    enumerable : true,
    configurable : false
});

module.exports.year = Year;
