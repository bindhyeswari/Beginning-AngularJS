

var app = angular.module('myApp', ['james']);

app.run(function ($rootScope) {
    // runs it during the configuration phase
    $rootScope.message = 'This is a message from the rootscope!';
});

var app2 = angular.module('james', []);

app2.controller('MyController', function ($scope, $http) { // dependencies
    $scope.message = 'Hello World from MyController!';
    var promise = $http.get('https://api.github.com/search/repositories?q=reactjs');
    promise.then(function (config) {
        console.log(config);
        $scope.items = config.data.items;
    });

});

app.controller('Controller2', function ($scope) {
    $scope.message = 'Hello World from Controller2!';
});