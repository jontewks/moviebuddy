'use strict';

var app = angular.module('moviebuddyApp');

app.service('getMoviesData', function($http){
  var rottenTomatoesUrl = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?callback=JSON_CALLBACK&apikey=63za93cgdtv88ves8p6d9wrk';
  var pageLimitQuery = '&page_limit=';
  var pageQuery = '&page=';
  this.getMovieData = function(queryPage, queryPageLimit) {
    var query = rottenTomatoesUrl + pageLimitQuery + queryPageLimit + pageQuery + queryPage;
    return $http.jsonp(query);
  };
});

app.controller('moviesController', function ($scope, $http, getMoviesData) {
  var totalMovies;
  var totalQueryPages;
  var queryPage = 1;
  var queryPageLimit = 50;

  $scope.allMovies = [];
  $scope.movies;
  $scope.totalPages;
  var pageLimit = 20;
  $scope.page = 1;

  var getMovies = function(queryPage, queryPageLimit) {
    getMoviesData.getMovieData(queryPage, queryPageLimit)
    .then(function(data){
      var rtData = data.data;
      totalMovies = rtData.total;
      totalQueryPages = Math.ceil(totalMovies / queryPageLimit);

      $scope.allMovies = $scope.allMovies.concat(rtData.movies);
      queryPage++;
      if (queryPage <= totalQueryPages) {
        getMovies(queryPage, queryPageLimit);
      }
      if (queryPage === totalQueryPages) {
        $scope.movies = $scope.allMovies.slice(($scope.page - 1) * pageLimit, pageLimit * $scope.page);
      }
    });
  };

  getMovies(queryPage, queryPageLimit);

  // go to the next page
  $scope.nextPage = function() {
    $scope.totalPages = Math.ceil($scope.allMovies.length / pageLimit);
    if ($scope.page + 1 > $scope.totalPages) {return;}
    $scope.movies = $scope.allMovies.slice($scope.page * pageLimit, pageLimit * (++$scope.page));
  };

  // go to the next page
  $scope.prevPage = function() {
    if ($scope.page - 1 <= 0) {return;}
    $scope.page--;
    $scope.movies = $scope.allMovies.slice(($scope.page - 1) * pageLimit, pageLimit * ($scope.page) );
  };

  $scope.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];

});
