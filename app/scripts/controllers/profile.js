'use strict';

/* global angular */

var app = angular.module('moviebuddyApp');

// This service returns 'Users' from the DB.
app.service('getUsers', function($http) {
  this.getUser = function(user) {
    return $http({
      method: 'GET',
      url: '/userQuery',
      params: {user: user},
    });
  };
});

// This controller controls the profile.
app.controller('profileController', function ($scope, getUsers) {

  // *** Want to grab this upon authentication. ***
  $scope.testUser = 'Josh Gman';
  $scope.testHometown;
  $scope.testFavMovie;
  $scope.testFavGenre;
  $scope.testAge;
  $scope.testFavTheater;
  $scope.testCurrentCity;
  $scope.testFavActor;

  // *** Want to nest this in a promise or callback. ***
  getUsers.getUser($scope.testUser)
  .then(function(data) {
    var user = data.data[0];
    $scope.testHometown     = user.hometown;
    $scope.testFavMovie     = user.favMovie;
    $scope.testFavGenre     = user.favGenre;
    $scope.testAge          = user.age;
    $scope.testFavTheater   = user.favTheater;
    $scope.testCurrentCity  = user.currentCity;
    $scope.testFavActor     = user.favActor;


  });

  // Mystery goodness.
  $scope.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];

});
