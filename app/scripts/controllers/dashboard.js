'use strict';

var app = angular.module('moviebuddyApp');

app.controller('DashController', ['$scope', '$http','$rootScope', 'authentication', function ($scope, $http, $rootScope, authentication) {
	$scope.logout = function() {
    authentication.fbLogout();
  };

}]);
