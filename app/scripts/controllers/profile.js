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
    return $http.put('/api/updateUser/' + facebookId, { user: userObj});
  };
});

// This controller controls the profile.
app.controller('ProfileController', function ($scope, $rootScope,getUsers, updateUser) {

  // *** Want to grab this upon authentication. ***
  $scope.user = {
    name              : '',
    Hometown          : '',
    favMovie          : '',
    favGenre          : '',
    age               : '',
    favTheater        : '',
    currentCity       : '',
    favActor          : '',
    profilePicture    : 'http://graph.facebook.com/'+$rootScope.user.facebookId+'/picture?type=large'
  };

  // *** Want to nest this in a promise or callback. ***
  getUsers.getUser($rootScope.user.facebookId)
  .then(function(data) {
    var user = data.data;
    $scope.user.name         = user.name;
    $scope.user.hometown     = user.hometown;
    $scope.user.favMovie     = user.favMovie;
    $scope.user.favGenre     = user.favGenre;
    $scope.user.age          = user.age;
    $scope.user.favTheater   = user.favTheater;
    $scope.user.currentCity  = user.currentCity;
    $scope.user.favActor     = user.favActor;
  });


  $scope.updateUser = function(){
    console.log('hitting updateUser');

  };

});