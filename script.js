var app = angular.module('labApp', ['ngRoute']);

  app.config(function($routeProvider){
    $routeProvider.when('/',{
      controller: 'routeCtrl',
      templateUrl: 'dogview.html'
    });
    $routeProvider.when('/primefactor',{
      controller: 'routeCtrl',
      templateUrl: 'primefactor.html'
    });
    $routeProvider.otherwise({ redirectTo: '/' });
  });

  app.controller('routeCtrl', function(){

});

app.controller('primeController', function primeNumbers($scope) {

  $scope.primes = function(number) {
    console.log(number);
    var factors = [];
    for (var i=2; i<=number; i++) {
      while (number % i === 0) {
      factors.push(i);
      number=number/i;
      $scope.factors = factors;

      }
    }
    console.log(factors);
    return factors;
  }
  //console.log("ran");
  //console.log($scope.primes)
});

app.factory('serviceAPI', function GetSession($http, $q){
    var defer = $q.defer();
    $http({
        method: "GET",
        url: 'https://www.reddit.com/r/puppies.json',
        data: "{}"
    }).success(function (data, status, config) {
        response = data;
        defer.resolve('done');
    }).error(function (data, status, config) {
        console.log(data);
        defer.reject();
    });
    return defer.promise;
});

app.controller('myController', function getAPI($scope,serviceAPI) {
  serviceAPI.then(function() {
    //console.log(response.data.children[0, 1, 2, 3].data);
    $scope.puppy1 = response.data.children[0].data.thumbnail;
    $scope.puppy2 = response.data.children[1].data.thumbnail;
    $scope.puppy3 = response.data.children[2].data.thumbnail;
    $scope.puppy4 = response.data.children[3].data.thumbnail;
  });
});


////------------Directives---------------///////

app.directive('myheader', function () {
  return {
    restrict: 'EA', //E = element, A = attribute, C = class, M = comment 
    templateUrl: 'sections/header.html',
      replace: true
   };
})

  app.directive('myfooter', function() {
    return {
      restrict: 'EA',
      templateUrl: 'sections/footer.html',
      replace: true,
    };
});
