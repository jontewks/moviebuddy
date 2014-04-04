'use strict';

var dash = angular.module('moviebuddyApp');

dash.controller('moviesController', function ($scope, $http) {

    var rottenTomatoesUrl = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?callback=JSON_CALLBACK&page_limit=50&apikey=63za93cgdtv88ves8p6d9wrk';

    $http.jsonp(rottenTomatoesUrl)
    .then(function(data){
      var rtData = data.data;
      $scope.movies = rtData.movies;
      $scope.moviePosters = [];
      for (var i = 0; i < $scope.movies.length; i++){
        $scope.moviePosters.push($scope.movies[i].posters.thumbnail);
      }
    });

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });




