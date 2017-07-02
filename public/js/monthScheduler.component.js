monthSchedulerApp.component('monthScheduler', {
    templateUrl: 'templates/monthScheduler.html',
    bindings: {
        month: '<'
    },
    controller: "MonthSchedulerCtrl as ctrl"
});

monthSchedulerApp.controller('MonthSchedulerCtrl', MonthSchedulerCtrl);
function MonthSchedulerCtrl() {
    var self = this;
}
