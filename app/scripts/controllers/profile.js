'use strict';

/* global angular */

var dash = angular.module('moviebuddyApp');

// This service returns 'Users' from the DB.
dash.service('getUsers', function($http) {
  this.getUser = function(user) {
    return $http({
      method: 'GET',
      url: '/userQuery',
      params: {user: user},
    });
  };
});

// This controller controls the profile.
dash.controller('profileController', function ($scope, getUsers) {

  // *** Want to grab this upon authentication. ***
  $scope.user = 'Josh Gman';

  // *** Want to nest this in a promise or callback. ***
  getUsers.getUser($scope.user)
  .then(function(data) {
    console.log(data.data[0]);
  });

  // Mystery goodness.
  $scope.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];

});
