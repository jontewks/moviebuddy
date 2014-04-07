'use strict';

var app = angular.module('moviebuddyApp');

app.controller('dashController', function ($scope, authentication) {

		$scope.logout = function(){
      authentication.fbLogout();
    };

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
