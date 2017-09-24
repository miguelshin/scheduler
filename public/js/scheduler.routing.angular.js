// Configuración de las rutas
schedulerApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'templates/year.html',
            controller: "YearCtrl",
            controllerAs: "yearCtrl"
            // copiar el código donde se genera index.html a una nueva plantilla year.html
        })
        .when('/day/:year/:month/:day', {
            templateUrl : 'templates/day.html',
            controller: "DayCtrl",
            controllerAs: "dayCtrl"
            // copiar el código donde se genera index.html a una nueva plantilla year.html
        })

});