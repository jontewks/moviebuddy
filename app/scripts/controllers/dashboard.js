'use strict';

var app = angular.module('moviebuddyApp');

app.controller('DashController', ['$scope', 'authentication', '$location', '$route', function ($scope, authentication, $location, $route) {

  $scope.route = $route;

  $scope.outingsVisible = true;
  $scope.moviesVisible = false;
  $scope.profileVisible = false;

  $scope.showOutings = function() {
    return $scope.outingsVisible;
  };

  $scope.showMovies = function() {
    return $scope.moviesVisible;
  };

  $scope.showProfile = function() {
    return $scope.profileVisible;
  };

  $scope.navToOutings = function() {
    $scope.outingsVisible = true;
    $scope.moviesVisible = false;
    $scope.profileVisible = false;
  };

  $scope.navToMovies = function() {
    $scope.outingsVisible = false;
    $scope.moviesVisible = true;
    $scope.profileVisible = false;
  };

  $scope.navToProfile = function() {
    $scope.outingsVisible = false;
    $scope.moviesVisible = false;
    $scope.profileVisible = true;
  };

  $scope.logout = function() {
    authentication.fbLogout();
  };
}]);
