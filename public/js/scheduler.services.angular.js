// Webservice remote calling
schedulerApp.service('schedulerService', function ($http, $q) {

  this.year = function (callback, errorHandler, year) {
  	$http.get('/year/' + year).then(callback, errorHandler);
  };

  this.day = function(year, month, day) {
 	$http.get("/day/" + year + "/" + month + "/" + day).then(callback, errorHandler);
  };

  this.validatedEmail = null;
  
	this.initializeFirebase = function() {
    debugger;
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
			this.loginValidation();
		}
		return firebase;
	}

	this.loginValidation = function() {
		debugger;
		// TODO: ponerlo en un servicio!!! ->
		//firebase.auth().signInWithEmailAndPassword(this.email, this.password);
		firebase.auth().signInWithEmailAndPassword("miguelaob@gmail.com", "123456");
  };
  
	this.logout = function() {
		firebase.auth().signOut().then(function() {
			self.validatedEmail = null;
		// Sign-out successful.
		}, function(error) {
		// An error happened.
		});
	};

	/*firebase.auth().createUserWithEmailAndPassword("benitomillan@gmail.com", "123456").catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		// ...
	});*/

});