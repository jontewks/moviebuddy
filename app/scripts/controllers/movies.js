'use strict';

var app = angular.module('moviebuddyApp');

app.service('getMoviesData', ['$http', function ($http) {
  this.allMovies = [];

  // Gets all data for movies currently in theaters and stores the movie objects in the allMovies array.
  this.getMovieData = function(queryPage, queryPageLimit) {
    var self = this;
    var rottenTomatoesUrl = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?callback=JSON_CALLBACK&apikey=63za93cgdtv88ves8p6d9wrk';
    var totalMovies;
    var totalQueryPages;
    var query = rottenTomatoesUrl + '&page_limit=' + queryPageLimit + '&page=' + queryPage;

    return $http.jsonp(query)
      .success(function (data) {
        totalMovies = data.total;
        totalQueryPages = Math.ceil(totalMovies / queryPageLimit);
        self.allMovies = self.allMovies.concat(data.movies);
        queryPage++;

        if (queryPage <= totalQueryPages) {
          self.getMovieData(queryPage, queryPageLimit);
        }
      });
  };
}]);

app.controller('MoviesController', ['$rootScope', '$scope', 'getMoviesData', function ($rootScope, $scope, getMoviesData) {
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
