'use strict';

var app = angular.module('moviebuddyApp');

app.controller('DashController', function ($scope, authentication) {
	$scope.logout = function(){
    console.log('trying to logout!!!');
    authentication.fbLogout();
  };
});
