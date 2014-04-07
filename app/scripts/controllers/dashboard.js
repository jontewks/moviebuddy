'use strict';

var app = angular.module('moviebuddyApp');

app.controller('dashController', function ($scope, authentication) {

		$scope.logout = function(){
      console.log('trying to logout!!!');
      authentication.fbLogout();
    };

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
