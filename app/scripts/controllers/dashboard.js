'use strict';

var app = angular.module('moviebuddyApp');

app.controller('DashController', ['$scope', 'authentication', function ($scope, authentication) {
	$scope.logout = function() {
    authentication.fbLogout();
  };
}]);
