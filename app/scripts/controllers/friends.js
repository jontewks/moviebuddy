'use strict';

var app = angular.module('moviebuddyApp');

app.service('getFriends', function($http) {
  this.friendsData = function(facebookId) {
    return $http({
      method: 'GET',
      url: 'http://moviebuddy.azurewebsite.net/api/friends/' + facebookId
    });
  };
});

app.controller('FriendsController', function($scope, $rootScope, getFriends) {
  getFriends.friendsData($rootScope.user.facebookId)
  .then(function(friends) {
    $scope.friends = friends.data;
  });
});
