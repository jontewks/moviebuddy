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

app.service('updateUsers', function($http){
  this.updateUser = function(facebookId, userObj) {
    return $http.put('/api/user/' + facebookId, { user: userObj});
  };
});

// This controller controls the profile.
app.controller('ProfileController', function ($scope, $rootScope,getUsers, updateUsers) {
  var facebookId = $rootScope.user.facebookId;
  // *** Want to grab this upon authentication. ***
  $scope.user = {
    facebookId        : facebookId,
    name              : '',
    hometown          : '',
    favMovie          : '',
    favGenre          : '',
    age               : '',
    favTheater        : '',
    currentCity       : '',
    favActor          : '',
    profilePicture    : 'http://graph.facebook.com/'+facebookId+'/picture?type=large'
  };

  // *** Want to nest this in a promise or callback. ***
  getUsers.getUser(facebookId)
  .then(function(data) {
    var user = data.data;
    $scope.user.name         = user.name;
    $scope.user.hometown     = user.hometown;
    $scope.user.favMovie     = user.favMovie;
    $scope.user.favGenre     = user.favGenre;
    $scope.user.age          = user.age;
    $scope.user.favTheater   = user.favTheater;
    $scope.user.currentCity  = user.city;
    $scope.user.favActor     = user.favActor;
  });


  $scope.updateUser = function(){
    console.log($scope.user);
    updateUsers.updateUser($rootScope.user.facebookId, $scope.user);

  };

});