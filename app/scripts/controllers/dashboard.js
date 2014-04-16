'use strict';

var app = angular.module('moviebuddyApp');

app.controller('DashController', ['$scope', '$http','$rootScope','$q', 'authentication','getLocation', function ($scope, $http, $rootScope, $q, authentication, getLocation) {
	$scope.logout = function() {
    authentication.fbLogout();
  };

  getLocation.getZip()
  .then(function(data){
    console.log('current zipcode: ', $rootScope.currentZip);
  });

}]);
