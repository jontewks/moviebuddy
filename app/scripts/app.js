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
// authentication service, handles login and logout
app.service('authentication', function($rootScope, $location, $http) {

  this.auth = function(){
    return $http({
      method: 'GET',
      url: '/auth/isLoggedIn'
    })
    .then(function(response){
      console.log(response);
      if (response.data === 'false') {
        $location.path('/');
      }
      $rootScope.user = response.data;
    });
  };
});



// Load the SDK Asynchronously
(function(d){
  var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement('script'); js.id = id; js.async = true;
  js.src = '//connect.facebook.net/en_US/all.js';
  ref.parentNode.insertBefore(js, ref);
}(document));
