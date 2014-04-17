var app = angular.module('moviebuddyApp');

app.service('getFriends', ['$http', function ($http) {
  // Queries server which returns an array of friend objects
  this.friendsData = function(facebookId) {
    return $http({
      method: 'GET',
      url: '/api/friends/' + facebookId
    });
  };
}]);

// Returns users from the DB.
app.service('getUsers', ['$http', function ($http) {
  this.getUser = function(facebookId) {
    return $http.get('/api/user/' + facebookId);
  };
}]);

app.service('updateUsers', ['$http', function ($http) {
  this.updateUser = function(facebookId, userObj) {
    return $http.put('/api/user/' + facebookId, { user: userObj });
  };
}]);

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

app.service('getTheaterData', ['$http', function ($http){

  this.getTheaters = function(zip) {
    var query = 'http://data.tmsapi.com/v1/theatres?zip='+zip+'&api_key=evgps6crhu6hxpyczeh9k5er';

    return $http.get(query);
  };

  this.getTheaterShowtimes = function(theaterId) {
    if (!theaterId) { return; }
    var date = new Date();
    var year = date.getYear() + 1900;
    var month = date.getMonth() + 1;
    var day = date.getDate();

    if (day < 10) {
      day = '0' + day;
    }

    if (month < 10) {
      month = '0' + month;
    }
    var today = year +'-'+ month + '-'+ day;

    var query = 'http://data.tmsapi.com/v1/theatres/'+theaterId+'/showings?startDate='+today+'&api_key=evgps6crhu6hxpyczeh9k5er';
    
    $http.jsonp(query)
    .success(function(data){
      console.log(data);
    });
  };

}]);

// Authentication service that handles login and logout
// authentication service, handles login and logout

app.service('authentication', function($rootScope, $location, $http) {

  this.auth = function(){
    return $http({
      method: 'GET',
      url: '/auth/isLoggedIn'
    })
    .then(function(response){
      if (response.data === 'false') {
        $location.path('/');
      }
      $rootScope.user = response.data;
    });
  };
});

app.service('getLocation', function($http, $rootScope, $q){

  this.getZip = function(){

    var deferred = $q.defer();

    navigator.geolocation.getCurrentPosition(function(position) {
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;
      var zipQuery = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lon+'&sensor=true';

      $http.get(zipQuery)
      .success(function(data){
        $rootScope.currentZip = data.results[0].address_components[7].short_name;
        deferred.resolve($rootScope.currentZip);
      });
    });

    return deferred.promise;
  };

})