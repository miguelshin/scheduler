// Webservice remote calling
schedulerApp.service('schedulerService', function ($http) {

  this.year = function (callback, errorHandler, year) {
  	$http.get('/year/' + year).then(callback, errorHandler);
  };

  this.day = function(year, month, day) {
 	$http.get("/day/" + year + "/" + month + "/" + day).then(callback, errorHandler);
  };

});