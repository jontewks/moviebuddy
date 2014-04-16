'use strict';

var app = angular.module('moviebuddyApp', ['ngRoute', 'ngCookies', 'xeditable']);

app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/login.html',
      resolve: {
        checkLogin: function(authentication) {
          return authentication.auth();
        }
      }
    })
    .when('/dash', {
      templateUrl: 'views/dashboard.html',
      controller: 'DashController',
      resolve: {
        checkLogin: function(authentication) {
          return authentication.auth();
        }
      }
    })
    .when('/newOuting', {
      templateUrl: 'views/outings.html',
      controller: 'OutingsController',
      resolve: {
        checkLogin: function(authentication) {
          return authentication.auth();
        }
      }
    })
    .otherwise({
      redirectTo: '/'
    });
}]);

// Authentication service that handles login and logout
app.service('authentication', ['$rootScope', '$location', '$http', function ($rootScope, $location, $http) {
  var cookieParser = function(cookie) {
    var splitCookie = cookie.split(';');
    for (var i = 0; i < splitCookie.length; i++){
      var leftSide = splitCookie[i].split('=')[0];
      var rightSide = splitCookie[i].split('=')[1];
      if( rightSide === 'undefined') {
        return JSON.parse(leftSide);
      }
    }
  };

  this.auth = function(){
    return $http({
      method: 'GET',
      url: '/auth/isLoggedIn'
    })
    .then(function(response){
      if (response.data === 'false') {
        $location.path('/');
      }
      if (window.document.cookie !== '') {
        var userObj = cookieParser(window.document.cookie);
        $rootScope.user = userObj;
      }
    });
  };
}]);

app.service('sendAlert', ['$rootScope', '$http', function ($rootScope, $http) {
  this.email = function() {
    $http({
      method: 'POST',
      url: '/sendalert',
      data: JSON.stringify({ 
        userId: $rootScope.user.facebookId,
        movie: $rootScope.currentMovie
      })
    })
    .success(function (data) {
    })
    .error(function (data, status, headers, config) {
      console.log('GET Error:', data, status, headers, config);
    });
  };
}]);
// Load the SDK Asynchronously
(function(d){
  var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement('script'); js.id = id; js.async = true;
  js.src = '//connect.facebook.net/en_US/all.js';
  ref.parentNode.insertBefore(js, ref);
}(document));
