'use strict';

var app = angular.module('moviebuddyApp');

// Returns users from the DB.
app.service('getUsers', ['$http', function ($http) {
  this.getUser = function(facebookId) {
    return $http.get('/api/user/' + facebookId);
  };
}]);

app.service('updateUsers', ['$http', function ($http) {
  this.updateUser = function(facebookId, userObj) {
    return $http.put('/api/user/' + facebookId, { user: userObj });
  };
}]);

app.controller('ProfileController', ['$scope', '$rootScope', 'getUsers', 'updateUsers', function ($scope, $rootScope, getUsers, updateUsers) {
  var facebookId = $rootScope.user.facebookId;
  
  $scope.user = {};

  getUsers.getUser(facebookId)
    .then(function (user) {
      var user = user.data;

      $scope.user.name = user.name;
      $scope.user.age = user.age;
      $scope.user.city = user.city;
      $scope.user.favTheater = user.favTheater;
      $scope.user.favGenre = user.favGenre;
      $scope.user.favActor = user.favActor;
      $scope.user.favMovie = user.favMovie;
      $scope.user.facebookId = facebookId;
      $scope.user.profilePicture = 'http://graph.facebook.com/' + facebookId + '/picture?type=large';
    });

  $scope.updateUser = function() {
    updateUsers.updateUser($rootScope.user.facebookId, $scope.user);
  };
}]);
