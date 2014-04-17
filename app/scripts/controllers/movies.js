'use strict';

var app = angular.module('moviebuddyApp');

app.controller('MoviesController', ['$rootScope', '$scope', 'getTheaterData', function ($rootScope, $scope, getTheaterData) {

  $scope.storeCurrent = function(movie) {
    $rootScope.currentMovie = movie;
  };


}]);

app.controller('movieInfoController', ['$scope', function ($scope) {
  $scope.textLimit = 75;
  $scope.moreText = '...';

  $scope.toggleText = function(text){
    if (!text) { text = ' '; }
    $scope.textLimit === 75 ? $scope.textLimit = text.length : $scope.textLimit = 75;
    $scope.moreText === '...' ? $scope.moreText = '' : $scope.moreText = '...';
  };
}]);
