'use strict';

var dash = angular.module('moviebuddyApp');

dash.controller('profileController', function ($scope, $http) {
  $scope.user = 'Josh Gman';

  $http({
    method: 'GET',
    url: '/userQuery',
    params: {user: $scope.user}
  });

  $scope.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];
});
