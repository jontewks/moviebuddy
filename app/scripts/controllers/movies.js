'use strict';

var app = angular.module('moviebuddyApp');

app.controller('MoviesController', ['$rootScope', '$scope', 'getMoviesData', 'getTheaterData', function ($scope, $rootScope, getMoviesData, getTheaterData) {
  var queryPage = 1;
  var queryPageLimit = 50;

  $scope.allMovies = [];

  var getMovies = function(queryPage, queryPageLimit) {
    getMoviesData.getMovieData(queryPage, queryPageLimit)
      .then(function () {
        var sortedMovies = getMoviesData.allMovies.sort(function (a,b) { return a.title.localeCompare(b.title); });
        $scope.allMovies = sortedMovies;
        $rootScope.allMovies = sortedMovies;
      });
  };

  $scope.storeCurrent = function(movie) {
    $rootScope.currentMovie = movie;
  };

  getMovies(queryPage, queryPageLimit);

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
