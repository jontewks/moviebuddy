'use strict';

var app = angular.module('moviebuddyApp');

app.controller('DashController', ['$scope', 'authentication', function ($scope, authentication) {

  var outingsVisible = true;
  var moviesVisible = false;
  var profileVisible = false;

  $scope.showOutings = function() {
    return outingsVisible;
  };

  $scope.showMovies = function() {
    return moviesVisible;
  };

  $scope.showProfile = function() {
    return profileVisible;
  };

  $scope.navToOutings = function() {
    outingsVisible = true;
    moviesVisible = false;
    profileVisible = false;
  };

  $scope.navToMovies = function() {
    outingsVisible = false;
    moviesVisible = true;
    profileVisible = false;
  };

  $scope.navToProfile = function() {
    outingsVisible = false;
    moviesVisible = false;
    profileVisible = true;
  };

  $scope.logout = function() {
    authentication.fbLogout();
  };
}]);
