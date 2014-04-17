'use strict';

var app = angular.module('moviebuddyApp');

app.controller('DashController', ['$scope', '$http','$rootScope', '$location', '$route', 'authentication', function ($scope, $http, $rootScope, authentication, $location, $route) {

  $scope.route = $route;

  $scope.outingsVisible = true;
  $scope.moviesVisible = false;
  $scope.friendsVisible = false;
  $scope.profileVisible = false;

  $scope.showOutings = function() {
    return $scope.outingsVisible;
  };

  $scope.showMovies = function() {
    return $scope.moviesVisible;
  };

  $scope.showFriends = function() {
    return $scope.friendsVisible;
  };

  $scope.showProfile = function() {
    return $scope.profileVisible;
  };

  $scope.navToOutings = function() {
    $scope.outingsVisible = true;
    $scope.moviesVisible = false;
    $scope.friendsVisible = false;
    $scope.profileVisible = false;
  };

  $scope.navToMovies = function() {
    $scope.outingsVisible = false;
    $scope.moviesVisible = true;
    $scope.friendsVisible = false;
    $scope.profileVisible = false;
  };

  $scope.navToFriends = function() {
    $scope.outingsVisible = false;
    $scope.moviesVisible = false;
    $scope.friendsVisible = true;
    $scope.profileVisible = false;
  };

  $scope.navToProfile = function() {
    $scope.outingsVisible = false;
    $scope.moviesVisible = false;
    $scope.friendsVisible = false;
    $scope.profileVisible = true;
  };

  $scope.logout = function() {
    authentication.fbLogout();
  };

}]);
