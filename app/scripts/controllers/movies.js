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
    var query = rottenTomatoesUrl + pageLimitQuery + queryPageLimit + pageQuery + queryPage;
    $http.jsonp(query)
    .success(function(data){
      var rtData = data.data;
      totalMovies = rtData.total;
      totalQueryPages = Math.ceil(totalMovies / queryPageLimit);

      this.allMovies = this.allMovies.concat(rtData.movies);
      queryPage++;

      if (queryPage <= totalQueryPages) {
        getMovies(queryPage, queryPageLimit);
      }
    });
  };
});

app.controller('moviesController', function ($scope, $http, getMoviesData) {

  var queryPage = 1;
  var queryPageLimit = 50;

  $scope.allMovies = [];

  var getMovies = function(queryPage, queryPageLimit) {
    getMoviesData.getMovieData(queryPage, queryPageLimit);
  };

  getMovies(queryPage, queryPageLimit);

  // sort movies helper function
  var sortMovies = function(collection, category) {
    if (category.split('.').length > 1) {
      category = category.split('.');
    }

    return collection.sort(function(a, b){
      a[category] = (a[category] === '' && category === 'runtime') ? 0 : a[category];
      a[category] = (a[category] === '' && category === 'runtime') ? 0 : a[category];

      if (Array.isArray(category)) {
        if (b[category[0]][category[1]] < a[category[0]][category[1]]) {
          return -1;
        } else {
          return 1;
        }
        return 0;
      } else {
        if (b[category] < a[category]) {
          return -1;
        } else {
          return 1;
        }
        return 0;
      }
    });
  };

  // sort all movies on button clicks
  $scope.sortAllMovies = function(category){
    $scope.allMovies = sortMovies($scope.allMovies, category);
  };

  // reverse the all movies storage
  $scope.reverseAllMovies = function(){
    $scope.allMovies.reverse();
  };

});

app.controller('castController', function($scope){
  $scope.textLimit = 40;
  $scope.moreText = '...';

  $scope.toggleText = function(text){
    $scope.textLimit = $scope.textLimit === 40 ? $scope.textLimit = text.length : $scope.textLimit = 40;
    $scope.moreText =  $scope.moreText === '...'? $scope.moreText = '' : $scope.moreText = '...';
  };
});


app.controller('synopsisController', function($scope){
  $scope.textLimit = 40;
  $scope.moreText = '...';

  $scope.toggleText = function(text){
    $scope.textLimit = $scope.textLimit === 40 ? $scope.textLimit = text.length : $scope.textLimit = 40;
    $scope.moreText =  $scope.moreText === '...'? $scope.moreText = '' : $scope.moreText = '...';
  };
});

app.controller('criticsController', function($scope){
  $scope.textLimit = 40;
  $scope.moreText = '...';

  $scope.toggleText = function(text){
    $scope.textLimit = $scope.textLimit === 40 ? $scope.textLimit = text.length : $scope.textLimit = 40;
    $scope.moreText =  $scope.moreText === '...' ? $scope.moreText = '' : $scope.moreText = '...';
  };
});
