monthSchedulerApp.component('monthScheduler', {
    templateUrl: 'templates/monthScheduler.html',
    bindings: {
        month: '<'
    },
    controller: "MonthSchedulerCtrl as monthSchedulerCtrl"
});

monthSchedulerApp.controller('MonthSchedulerCtrl', MonthSchedulerCtrl);
function MonthSchedulerCtrl() {
    var self = this;
}
