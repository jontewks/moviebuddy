'use strict';

var app = angular.module('moviebuddyApp');

app.service('getFriends', ['$http', function ($http) {
  // Queries server which returns an array of friend objects
  this.friendsData = function(facebookId) {
    return $http({
      method: 'GET',
      url: '/api/friends/' + facebookId
    });
  };
}]);

app.controller('FriendsController', ['$scope', '$rootScope', 'getFriends', function ($scope, $rootScope, getFriends) {
  getFriends.friendsData($rootScope.user.facebookId)
    .then(function(friends) {
      $scope.friends = friends.data;
    });
}]);
