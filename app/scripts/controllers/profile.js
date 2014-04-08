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

app.service('updateUser', function($http){
  this.updateUser = function(facebookId, userObj) {
    return $http({
      method : 'POST',
      url    : '/api/updateUser',
      data   : { user: userObj }
    });
  };
});

// This controller controls the profile.
app.controller('ProfileController', function ($scope, $rootScope,getUsers) {

  // *** Want to grab this upon authentication. ***
  $scope.User;
  $scope.Hometown;
  $scope.FavMovie;
  $scope.FavGenre;
  $scope.Age;
  $scope.FavTheater;
  $scope.CurrentCity;
  $scope.FavActor;
  $scope.profilePicture = 'http://graph.facebook.com/'+$rootScope.user.facebookId+'/picture?type=large';
  // *** Want to nest this in a promise or callback. ***
  getUsers.getUser($rootScope.user.facebookId)
  .then(function(data) {
    var user = data.data;
    $scope.User         = user.name;
    $scope.Hometown     = user.hometown;
    $scope.FavMovie     = user.favMovie;
    $scope.FavGenre     = user.favGenre;
    $scope.Age          = user.age;
    $scope.FavTheater   = user.favTheater;
    $scope.CurrentCity  = user.currentCity;
    $scope.FavActor     = user.favActor;
  });

});