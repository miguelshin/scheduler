schedulerApp.controller('YearCtrl', function(schedulerService, $scope) {

	var self = this;
	this.nextYear = function() {
		year = parseInt(this.year.id) + 1;
		self.getYear(year);
	}
	this.getYear = function(year) {
	    schedulerService.year(function (response) {
	  		self.content = response.data;
	        self.year = self.content;
	    }, errorHandler, year);
	}

	year = new Date().getFullYear();
	self.getYear(year);
	self.one = "pepe";
});

function errorHandler() {
	alert("error!!");
}

schedulerApp.controller('LoginCtrl', function($scope, $cookies) {
	var self = this;
	// Initialize Firebase
	var config = {
		apiKey: "AIzaSyDcOyjL7sL3ESHlIWmrTLkLl0cbSYTgBqk",
		authDomain: "scheduler-ff919.firebaseapp.com",
		databaseURL: "https://scheduler-ff919.firebaseio.com",
		projectId: "scheduler-ff919",
		storageBucket: "scheduler-ff919.appspot.com",
		messagingSenderId: "241428894999"
	};
	firebase.initializeApp(config);
	
	firebase.auth().onAuthStateChanged(function(user) {
		debugger;
		if (user) {
			// User is signed in.
			$scope.$apply(function() {
				self.validatedEmail = user.email;
			});
		} else {
			// No user is signed in.
		}
	});
	debugger;
	self.loginValidation = loginValidation;
	self.logout = logout;

	this.$onInit = function() {
		//alert("XDDD");
	}
	/*function writeNewPost(uid, username, picture, title, body) {
		debugger;
		// A post entry.
		var postData = {
			author: username,
			uid: uid,
			body: body,
			title: title,
			starCount: 0,
			authorPic: picture
		};

		// Get a key for a new Post.
		var newPostKey = firebase.database().ref().child('posts').push().key;

		// Write the new post's data simultaneously in the posts list and the user's post list.
		var updates = {};
		updates['/posts/' + newPostKey] = postData;
		updates['/user-posts/' + uid + '/' + newPostKey] = postData;

		firebase.database().ref('/user-posts/123/-KpiS6zcStLpEtbTDI1E/').once('value').then(function(snapshot) {
			debugger;
			var username = snapshot.val().author;
			// ...
			});
		//return firebase.database().ref().update(updates);
	}
	writeNewPost(123, "miguel", "j.jpg", "un titulo", "body");

	var user = {
		email: "malvarez@desarrolloweb.com",
		password: "1234"
		};
*/
	/*firebase.auth().createUserWithEmailAndPassword("benitomillan@gmail.com", "123456").catch(function(error) {
		// Handle Errors here.
		debugger;
		var errorCode = error.code;
		var errorMessage = error.message;
		// ...
	});*/

	function loginValidation() {
		debugger;
		// TODO: ponerlo en un servicio!!! ->
		//firebase.auth().signInWithEmailAndPassword(this.email, this.password);
		firebase.auth().signInWithEmailAndPassword("miguelaob@gmail.com", "123456");
	}

	function logout() {
		debugger;
		firebase.auth().signInWithEmailAndPassword($scope.email, $scope.password).then(function(data){
			if(data){
				$scope.validatedEmail = $scope.email;
				$scope.$apply();
			}else{
				console.log("no tengo usuario autenticado");
			}
		});
	}

});

schedulerApp.controller('DayCtrl', function(schedulerService, $scope, $routeParams) {

	debugger;
	var self = this;
	self.day = $routeParams.day;
	self.month = $routeParams.month;
	self.year = $routeParams.year;
	self.saveDay = saveDay;
	self.saveImage = saveImage;

	function saveDay() {
		alert("XD");
		var canvas = document.getElementById("canvasSignature");
		var img = canvas.toDataURL("image/png");
		document.write('<img src="'+img+'"/>');
//		var canvas = document.getElementById("canvasSignature");
//		var dataUrl = canvas.toDataURL('image/jpeg',0.1); // obtenemos la imagen como png

//		dataUrl=dataUrl.replace("image/png",'image/octet-stream'); // sustituimos el tipo por octet
//		document.location.href =dataUrl; // para forzar al navegador a descargarlo
	}

	debugger;
 	var auth = firebase.auth();
    var storageRef = firebase.storage().ref();

	auth.onAuthStateChanged(function(user) {
		debugger;
	if (user) {
		console.log('Anonymous user signed-in.', user);
		document.getElementById('file').disabled = false;
	} else {
		console.log('There was no anonymous session. Creating a new anonymous user.');
		// Sign the user in anonymously since accessing Storage requires the user to be authorized.
		auth.signInAnonymously();
	}
	});

	function loadImage() {

	}
    function saveImage() {
		debugger;
		storageRef.child('images/' + firebase.auth().currentUser.uid + '/file2').getDownloadURL().then(function(url) {
			debugger;
			// `url` is the download URL for 'images/stars.jpg'

			// This can be downloaded directly:
			var xhr = new XMLHttpRequest();
			xhr.responseType = 'blob';
			xhr.onload = function(event) {
				var blob = xhr.response;
			};
			xhr.open('GET', url);
			xhr.send();

			// Or inserted into an <img> element:
			var img = document.getElementById('myimg');
			img.src = url;
		}).catch(function(error) {
			// Handle any errors
		});

      	// set canvasImg image src to dataURL
		// so it can be saved as an image

		var canvas = document.getElementById('canvasSignature');
		canvas.toBlob(function(blob){
			var image = new Image();
			image.src = blob;
			// Push to child path.
			// [START oncomplete]
			debugger;
			alert("XDDD");
			storageRef.child('images/' + firebase.auth().currentUser.uid + '/file2').put(blob).then(function(snapshot) {
				debugger;
				console.log('Uploaded', snapshot.totalBytes, 'bytes.');
				console.log(snapshot.metadata);
				var url = snapshot.downloadURL;
				debugger;
				console.log('File available at', url);
			}).catch(function(error) {
				// [START onfailure]
				console.error('Upload failed:', error);
				// [END onfailure]
				// [END oncomplete]
			});
		});
    }

	// works out the X, Y position of the click inside the canvas from the X, Y position on the page
	function getPosition(mouseEvent, sigCanvas) {
	 var x, y;
	 if (mouseEvent.pageX != undefined && mouseEvent.pageY != undefined) {
	    x = mouseEvent.pageX;
	    y = mouseEvent.pageY;
	 } else {
	    x = mouseEvent.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
	    y = mouseEvent.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	 }

	 return { X: x - sigCanvas.offsetLeft, Y: y - sigCanvas.offsetTop };
	}

	function initialize() {
	 // get references to the canvas element as well as the 2D drawing context
	 var sigCanvas = document.getElementById("canvasSignature");
	 var context = sigCanvas.getContext("2d");
	 context.strokeStyle = 'Black';

	 // This will be defined on a TOUCH device such as iPad or Android, etc.
	 var is_touch_device = 'ontouchstart' in document.documentElement;

	 if (is_touch_device) {
	    // create a drawer which tracks touch movements
	    var drawer = {
	       isDrawing: false,
	       touchstart: function (coors) {
	          context.beginPath();
	          context.moveTo(coors.x, coors.y);
	          this.isDrawing = true;
	       },
	       touchmove: function (coors) {
	          if (this.isDrawing) {
	             context.lineTo(coors.x, coors.y);
	             context.stroke();
	          }
	       },
	       touchend: function (coors) {
	          if (this.isDrawing) {
	             this.touchmove(coors);
	             this.isDrawing = false;
	          }
	       }
	    };

	    // create a function to pass touch events and coordinates to drawer
	    function draw(event) {

	       // get the touch coordinates.  Using the first touch in case of multi-touch
	       var coors = {
	          x: event.targetTouches[0].pageX,
	          y: event.targetTouches[0].pageY
	       };

	       // Now we need to get the offset of the canvas location
	       var obj = sigCanvas;

	       if (obj.offsetParent) {
	          // Every time we find a new object, we add its offsetLeft and offsetTop to curleft and curtop.
	          do {
	             coors.x -= obj.offsetLeft;
	             coors.y -= obj.offsetTop;
	          }
			  // The while loop can be "while (obj = obj.offsetParent)" only, which does return null
			  // when null is passed back, but that creates a warning in some editors (i.e. VS2010).
	          while ((obj = obj.offsetParent) != null);
	       }

	       // pass the coordinates to the appropriate handler
	       drawer[event.type](coors);
	    }


	    // attach the touchstart, touchmove, touchend event listeners.
	    sigCanvas.addEventListener('touchstart', draw, false);
	    sigCanvas.addEventListener('touchmove', draw, false);
	    sigCanvas.addEventListener('touchend', draw, false);

	    // prevent elastic scrolling
	    sigCanvas.addEventListener('touchmove', function (event) {
	       event.preventDefault();
	    }, false); 
	 }
	 else {

	    // start drawing when the mousedown event fires, and attach handlers to
	    // draw a line to wherever the mouse moves to
	    $("#canvasSignature").mousedown(function (mouseEvent) {
	       var position = getPosition(mouseEvent, sigCanvas);

	       context.moveTo(position.X, position.Y);
	       context.beginPath();

	       // attach event handlers
	       $(this).mousemove(function (mouseEvent) {
	          drawLine(mouseEvent, sigCanvas, context);
	       }).mouseup(function (mouseEvent) {
	          finishDrawing(mouseEvent, sigCanvas, context);
	       }).mouseout(function (mouseEvent) {
	          finishDrawing(mouseEvent, sigCanvas, context);
	       });
	    });

	 }
	}

	// draws a line to the x and y coordinates of the mouse event inside
	// the specified element using the specified context
	function drawLine(mouseEvent, sigCanvas, context) {

	 var position = getPosition(mouseEvent, sigCanvas);

	 context.lineTo(position.X, position.Y);
	 context.stroke();
	}

	// draws a line from the last coordiantes in the path to the finishing
	// coordinates and unbind any event handlers which need to be preceded
	// by the mouse down event
	function finishDrawing(mouseEvent, sigCanvas, context) {
	 // draw the line to the finishing coordinates
	 drawLine(mouseEvent, sigCanvas, context);

	 context.closePath();

	 // unbind any events which could draw
	 $(sigCanvas).unbind("mousemove")
	             .unbind("mouseup")
	             .unbind("mouseout");
	}
	debugger;
    initialize();

});

function errorHandler() {
	alert("error!!");
}
