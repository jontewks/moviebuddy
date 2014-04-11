'use strict';

var app = angular.module('moviebuddyApp');

app.service('getMoviesData', function($http){
  var rottenTomatoesUrl = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?callback=JSON_CALLBACK&apikey=63za93cgdtv88ves8p6d9wrk';
  var pageLimitQuery = '&page_limit=';
  var pageQuery = '&page=';

  var totalMovies;
  var totalQueryPages;
  this.allMovies = [];

  this.getMovieData = function(queryPage, queryPageLimit) {
    var that = this;
    var query = rottenTomatoesUrl + pageLimitQuery + queryPageLimit + pageQuery + queryPage;
    return $http.jsonp(query)
    .success(function(data){
      totalMovies = data.total;
      totalQueryPages = Math.ceil(totalMovies / queryPageLimit);

      that.allMovies = that.allMovies.concat(data.movies);
      queryPage++;

      if (queryPage <= totalQueryPages) {
        that.getMovieData(queryPage, queryPageLimit);
      }
    });
  };
});


app.controller('MoviesController', function ( $rootScope, $scope, $http, getMoviesData) {

  var queryPage = 1;
  var queryPageLimit = 50;

  $scope.allMovies = [];


  var getMovies = function(queryPage, queryPageLimit) {
    getMoviesData.getMovieData(queryPage, queryPageLimit)
    .then(function(){
      var sortedMovies = getMoviesData.allMovies.sort(function(a,b){return a.title.localeCompare(b.title);});
      $scope.allMovies = sortedMovies;
      $rootScope.allMovies = sortedMovies;
    });
  };

  getMovies(queryPage, queryPageLimit);

});


app.controller('synopsisController', function($scope){
  $scope.textLimit = 40;
  $scope.moreText = '...';

  $scope.toggleText = function(text){
    if (!text) { text = ' '; }
    $scope.textLimit = $scope.textLimit === 40 ? $scope.textLimit = text.length : $scope.textLimit = 40;
    $scope.moreText =  $scope.moreText === '...'? $scope.moreText = '' : $scope.moreText = '...';
  };
});

app.controller('criticsController', function($scope){
  $scope.textLimit = 40;
  $scope.moreText = '...';

  $scope.toggleText = function(text){
    if (!text) { text = ' '; }
    $scope.textLimit = $scope.textLimit === 40 ? $scope.textLimit = text.length : $scope.textLimit = 40;
    $scope.moreText =  $scope.moreText === '...' ? $scope.moreText = '' : $scope.moreText = '...';
  };
});
