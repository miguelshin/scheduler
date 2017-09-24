const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function Month(id, year) {
    this.id = id;
    this.value = null;
    this.year = year;
    this.days = null;
    this.numDays = null;
    this.daysHTML = null;

    this.getNumDays = function() {
        return new Date(this.year.id, this.id, 0).getDate();
    }

    this.monthValue = function() {
        return months[this.id - 1];
    }

    this.renderMonthDaysHTML = function() {
        html = "";
        html += "<div class='table-responsive'>";
        html += "<table class='table'>";
        html += "<tr>";
        // First day of the month: filling empty columns
        var emptyDaysFirstWeek = 7;
        var filledDaysFirstWeek = 0;
        for(var day = 1; day <= this.getNumDays(); day++) {
            filledDaysFirstWeek++;
            if (new Date(this.year.id, this.id - 1, day).getDay() % 7 == 0 && day < this.getNumDays() - 1) {
                break;
            }
        }

        emptyDaysFirstWeek -= filledDaysFirstWeek;
        for(var column = 0; column < emptyDaysFirstWeek; column++) {
            html += "<td>";
            html += "</td>";
        }
        
        // Filling month days
        for(var day = 1; day <= this.getNumDays(); day++) {
            html += "<td>";
            // Usar route de angular para rescatar los parámetros que pasemos por get
            html += "<a href=#!day/" + this.year.id + "/" + this.id + "/" + day + ">" + day + "</a>";
            html += "</td>";
            if (new Date(this.year.id, this.id - 1, day).getDay() % 7 == 0 && day < this.getNumDays() - 1) {
                html += "</tr><tr>";
            }
        }

        // Filling empty final week columns
        for(var day = this.getNumDays(); new Date(this.year.id, this.id - 1, day).getDay() % 7 != 0; day++) {
            html += "<td>";
            html += "</td>";
        }
        html += "</tr><tr>";
        html +="</table>";
        html +="</div>";
        console.log("mes!!");
        return(html);
    }
}


Object.defineProperty(Month, 'months', {
    value: months,
    writable : false,
    enumerable : true,
    configurable : false
});

module.exports.month = Month;
