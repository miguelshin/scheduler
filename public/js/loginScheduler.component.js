loginSchedulerApp.component('loginScheduler', {
    templateUrl: 'templates/loginScheduler.html',
    controller: "LoginSchedulerCtrl as loginSchedulerCtrl"
});

loginSchedulerApp.controller('LoginSchedulerCtrl', LoginSchedulerCtrl);

function LoginSchedulerCtrl($scope) {
	var self = this;
	self.loginValidation = loginValidation;
	self.logout = logout;
	self.initializeFirebase = initializeFirebase;
	self.$onInit = init;

	function init() {
		initializeFirebase();
		//alert("XDDD");
	}

	function initializeFirebase() {
		// Initialize Firebase
		var config = {
			apiKey: "AIzaSyDcOyjL7sL3ESHlIWmrTLkLl0cbSYTgBqk",
			authDomain: "scheduler-ff919.firebaseapp.com",
			databaseURL: "https://scheduler-ff919.firebaseio.com",
			projectId: "scheduler-ff919",
			storageBucket: "scheduler-ff919.appspot.com",
			messagingSenderId: "241428894999"
		};
		if (firebase !== undefined) {
			firebase.initializeApp(config);
			loginValidation();
		}
		firebase.auth().onAuthStateChanged(function(user) {
			$scope.$apply(function() {
				if (user) {
					self.validatedEmail = user.email;
				} else {
					self.validatedEmail = null;
				}
			});
		});
	}

	function loginValidation() {
		// TODO: ponerlo en un servicio!!! ->
		//firebase.auth().signInWithEmailAndPassword(this.email, this.password);
		firebase.auth().signInWithEmailAndPassword("miguelaob@gmail.com", "123456");
	}
	function logout() {
		firebase.auth().signOut().then(function() {
			self.validatedEmail = null;
		// Sign-out successful.
		}, function(error) {
		// An error happened.
		});
	}

	/*firebase.auth().createUserWithEmailAndPassword("benitomillan@gmail.com", "123456").catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		// ...
	});*/

}
