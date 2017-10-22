loginSchedulerApp.component('loginScheduler', {
    templateUrl: 'templates/loginScheduler.html',
    controller: "LoginSchedulerCtrl as loginSchedulerCtrl"
});

loginSchedulerApp.controller('LoginSchedulerCtrl', LoginSchedulerCtrl);

function LoginSchedulerCtrl($scope, schedulerService) {
	var self = this;
	self.$onInit = init;
	self.schedulerService = schedulerService;	

	function init() {
		debugger;
		firebase = schedulerService.initializeFirebase();
		debugger;
		firebase.auth().onAuthStateChanged(function(user) {
			$scope.$apply(function() {
				debugger;
				if (user) {
					self.validatedEmail = user.email;
				} else {
					self.validatedEmail = null;
				}
			});
		});

	}

}
