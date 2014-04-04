'use strict';

var app = angular.module('moviebuddyApp');

app.service('getMoviesData', function($http){
  var rottenTomatoesUrl = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?callback=JSON_CALLBACK&apikey=63za93cgdtv88ves8p6d9wrk';
  var pageLimitQuery = '&page_limit=';
  var pageQuery = '&page=';
  this.getMovieData = function(page) {
    // page = page || 1;
    var pageLimit = 20;
    var query = rottenTomatoesUrl + pageLimitQuery + pageLimit + pageQuery + page;
    return $http.jsonp(query);
  };
});

app.controller('moviesController', function ($scope, $http, getMoviesData) {
  $scope.movies;
  $scope.page = 1;
  $scope.totalMovies;

  // get movie data
  getMoviesData.getMovieData($scope.page)
  .then(function(data){
    var rtData = data.data;
    $scope.movies = rtData.movies;
    $scope.totalMovies = rtData.total;
  });

  // go to the next page
  $scope.nextPage = function() {

    var lastPage = Math.ceil($scope.totalMovies / 20);
    if ($scope.page === lastPage) { return;}

    getMoviesData.getMovieData(++$scope.page)
    .then(function(data) {
      var rtData = data.data;
      $scope.movies = rtData.movies;
    });

  };

  // go to the next page
  $scope.prevPage = function() {

    if ($scope.page === 1) { return; }

    getMoviesData.getMovieData(--$scope.page)
    .then(function(data) {
      var rtData = data.data;
      $scope.movies = rtData.movies;
    });

  };

  $scope.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];

});
