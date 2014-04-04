'use strict';

var app = angular.module('moviebuddyApp');

app.service('getMoviesData', function($http){
  var rottenTomatoesUrl = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?callback=JSON_CALLBACK&apikey=63za93cgdtv88ves8p6d9wrk';
  var pageLimitQuery = '&page_limit=';
  var pageQuery = '&page=';
  this.getMovieData = function(page, pageLimit) {
    page = page || 1;
    pageLimit = pageLimit || 20;
    var query = rottenTomatoesUrl + pageLimitQuery + pageLimit + pageQuery + page;
    return $http.jsonp(query);
  };
});

app.controller('moviesController', function ($scope, $http, getMoviesData) {

  getMoviesData.getMovieData()
  .then(function(data){
    var rtData = data.data;
    console.log(rtData);
    $scope.movies = rtData.movies;
  });

  $scope.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];

});
