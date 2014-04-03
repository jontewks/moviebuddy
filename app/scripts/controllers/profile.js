'use strict';

var dash = angular.module('moviebuddyApp');

dash.controller('profileController', function ($scope, $http) {
  $http({
    method: 'GET',
    url: '/userQuery',
  });
  $scope.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];
});
