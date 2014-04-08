'use strict';
/* global FB */

var app = angular.module('moviebuddyApp', ['ngRoute', 'ngCookies']);

app.config(function ($routeProvider) {

  $routeProvider
    .when('/', {
      templateUrl: 'views/login.html',
      controller: 'LoginController',
      resolve: {
        checkLogin: function(authentication){
          return authentication.auth();
        }
      }
    })
    .when('/dash', {
      templateUrl: 'views/dashboard.html',
      controller: 'DashController',
      resolve: {
        checkLogin: function(authentication){
          return authentication.auth();
        }
      }
    })
    .otherwise({
      redirectTo: '/',
      templateUrl: 'views/login.html',
      controller: 'LoginController'
    });
});

app.run(function($rootScope, $location) {
 // Fun Stuff
});


// authentication service, handles login and logout
app.service('authentication', function($rootScope, $location, $http) {
  this.auth = function(){
    return $http({
      method: 'GET',
      url: '/auth/isLoggedIn'
    })
    .then(function(response){
      if (window.document.cookie !== '') {
        var userObj = JSON.parse(window.document.cookie.split('=')[0]);
        $rootScope.user = userObj;
      }
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

