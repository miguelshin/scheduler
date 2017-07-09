schedulerApp.controller('YearCtrl', function(schedulerService, $scope, $sce) {

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

schedulerApp.controller('DayCtrl', function(schedulerService, $scope, $sce, $routeParams) {

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



    function saveImage() {
	debugger;
	alert("pepe");
	debugger;
      var file = document.getElementById('file').files[0];


      var metadata = {
        'contentType': file.type
      };

      // Push to child path.
      // [START oncomplete]
      storageRef.child('images/' + file.name).put(file, metadata).then(function(snapshot) {
        console.log('Uploaded', snapshot.totalBytes, 'bytes.');
        console.log(snapshot.metadata);
        var url = snapshot.downloadURL;
        console.log('File available at', url);
        // [START_EXCLUDE]
        document.getElementById('linkbox').innerHTML = '<a href="' +  url + '">Click For File</a>';
        // [END_EXCLUDE]
      }).catch(function(error) {
        // [START onfailure]
        console.error('Upload failed:', error);
        // [END onfailure]
      });
      // [END oncomplete]
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
