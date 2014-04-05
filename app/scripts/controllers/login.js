'use strict';

var app = angular.module('moviebuddyApp');

app.controller('loginController', function ($scope) {
    console.log('hitting the login script');

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
