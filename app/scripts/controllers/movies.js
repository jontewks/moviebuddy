'use strict';

var app = angular.module('moviebuddyApp');

app.service('getMoviesData', function($http){
  var rottenTomatoesUrl = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?callback=JSON_CALLBACK&apikey=63za93cgdtv88ves8p6d9wrk';
  var pageLimitQuery = '&page_limit=';
  var pageQuery = '&page=';
  this.getMovieData = function(page, pageLimit) {
    var query = rottenTomatoesUrl + pageLimitQuery + pageLimit + pageQuery + page;
    return $http.jsonp(query);
  };
});

app.controller('moviesController', function ($scope, $http, getMoviesData) {
  $scope.allMovies = [];
  $scope.movies;
  $scope.page = 1;
  var pageLimit = 50;

  var getMovies = function(page, pageLimit) {
    getMoviesData.getMovieData(page, pageLimit)
    .then(function(data){
      var rtData = data.data;
      var totalMovies = rtData.total;
      var totalPages = Math.ceil(totalMovies / pageLimit);
      $scope.allMovies = $scope.allMovies.concat(rtData.movies);

      if (page <= totalPages) {
        getMovies(++page, pageLimit);
      }
      if (page === totalPages) {
        $scope.movies = $scope.allMovies.slice(0, 20);
      }
    });
  };
  getMovies($scope.page, pageLimit);

  // Filter and/or sort movies

  // Display (render?) movies

  // go to the next page
  $scope.nextPage = function() {

  };

  // go to the next page
  $scope.prevPage = function() {

  };

  $scope.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];

});
