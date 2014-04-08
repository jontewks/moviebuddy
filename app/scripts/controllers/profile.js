'use strict';

/* global angular */

var app = angular.module('moviebuddyApp');

// This service returns 'Users' from the DB.
app.service('getUsers', function($http) {
  this.getUser = function(facebookId) {
    return $http({
      method: 'GET',
      url: '/api/user/' + facebookId
    });
  };

});

// This controller controls the profile.
app.controller('profileController', function ($scope, $rootScope,getUsers) {

  // *** Want to grab this upon authentication. ***
  $scope.testUser;
  $scope.testHometown;
  $scope.testFavMovie;
  $scope.testFavGenre;
  $scope.testAge;
  $scope.testFavTheater;
  $scope.testCurrentCity;
  $scope.testFavActor;
  $scope.profilePicture;
  $scope.profilePicture = 'http://graph.facebook.com/'+$rootScope.user.facebookId+'/picture?type=large';
  // *** Want to nest this in a promise or callback. ***
  getUsers.getUser($rootScope.user.facebookId)
  .then(function(data) {
    var user = data.data;
    $scope.testUser         = user.name;
    $scope.testHometown     = user.hometown;
    $scope.testFavMovie     = user.favMovie;
    $scope.testFavGenre     = user.favGenre;
    $scope.testAge          = user.age;
    $scope.testFavTheater   = user.favTheater;
    $scope.testCurrentCity  = user.currentCity;
    $scope.testFavActor     = user.favActor;
  });

});