'use strict';

var app = angular.module('moviebuddyApp');

app.controller('FriendsController', ['$scope', '$rootScope', 'getFriends', function ($scope, $rootScope, getFriends) {
  getFriends.friendsData($rootScope.user.facebookId)
    .then(function(friends) {
      $scope.friends = friends.data;
    });
}]);
