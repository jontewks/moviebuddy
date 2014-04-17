'use strict';

var app = angular.module('moviebuddyApp');

app.controller('DashController', ['$scope', 'authentication', '$location', '$route', function ($scope, authentication, $location, $route) {

  // $scope.route = $route;

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
    // console.log($scope, $route, $location);
  };

  $scope.navToMovies = function() {
    outingsVisible = false;
    moviesVisible = true;
    profileVisible = false;
    // console.log($scope, $route, $location);
  };

  $scope.navToProfile = function() {
    outingsVisible = false;
    moviesVisible = false;
    profileVisible = true;
    // console.log($scope, $route, $location);
  };

  $scope.logout = function() {
    authentication.fbLogout();
  };
}]);
